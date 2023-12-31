import { useMemo } from 'react';
import * as R from 'ramda';
import { useQuery, useMutation } from '@apollo/client';
import { APPT_TYPE } from 'utils/constants';
import {
  LIST_APPOINTMENTS,
  LIST_BRANCHES_TREE,
  LIST_TODAY_APPOINTMENTS,
  ARCHIVE_APPOINTMENT,
  COMPLETE_APPOINTMENT,
  LIST_REVENUES,
  LIST_EXPENSES,
  LIST_INVENTORY,
  LIST_INVENTORY_HISTORY,
  UPDATE_BUSINESS_NOTES,
  PATIENT_COUPONS,
  ADJUST_APPOINTMENT,
  CANCEL_APPOINTMENT,
  GET_INVOICE_COUNTER,
  DELETE_APPOINTMENT_PHOTO,
  GET_APPOINTMENT_HISTORY,
  CONFIRMED_APPOINTMENT,
  TRANSFER_APPOINTMENTS,
  ARCHIVE_REFERED_DOCTORAPPOINTMENT,
  GET_PATIENT,
} from 'apollo-client/queries';
import { useBranchTree } from 'hooks';
import client from 'apollo-client/client';
import { Alert } from 'rsuite';

const updateTodayAppointmentsCache = ({ appointments, appointmentsCount }) => {
  client.writeQuery({
    query: LIST_TODAY_APPOINTMENTS,
    data: {
      todayAppointments: { appointments, appointmentsCount },
    },
  });
};

function useAppointments({
  includeSurgery,
  page,
  patient,
  specialtyId,
  branchId,
  doctorId,
  type,
  status,
  action,
  patientId,
  onDeletePhoto,
  setFollowUp,
  setPopUp,
  open,
  followUpFeature,
  canAddFollowUp,
  setAppointment,
  onArchive,
} = {}) {
  const { data: todayAppointmentsData, refetch: refetchTodayAppointments } =
    useQuery(LIST_TODAY_APPOINTMENTS, {
      fetchPolicy: 'cache-and-network',
      variables: Object.assign(
        {
          offset: (page - 1) * 30 || 0,
          limit: 30,
          status: status,
        },
        patient && { patient: patient },
        branchId && { branchId: branchId },
        specialtyId && { specialtyId: specialtyId },
        doctorId && { doctorId: doctorId }
      ),
    });
  const todayAppointmentsDATA = todayAppointmentsData?.todayAppointments;

  const todayAppointments = useMemo(
    () =>
      R.pipe(
        R.propOr([], 'appointments'),
        R.reject(R.propEq('status', 'Cancelled')),
        includeSurgery
          ? R.identity
          : R.reject(R.propEq('type', APPT_TYPE.Surgery))
      )(todayAppointmentsDATA),
    [todayAppointmentsDATA, includeSurgery]
  );

  const todayAppointmentsCount = useMemo(
    () => R.propOr(0, 'appointmentsCount')(todayAppointmentsDATA),
    [todayAppointmentsDATA]
  );

  const { filterBranches } = useBranchTree({ action: action });
  const [archive, { loading: archiveLoading }] = useMutation(
    ARCHIVE_APPOINTMENT,
    {
      onCompleted: () => {
        Alert.success('Appointment has been Archived successfully');
        onArchive && onArchive();
        refetchTodayAppointments();
        if (followUpFeature && canAddFollowUp) {
          setFollowUp(true);
          setPopUp('followUpAppointment');
          open();
        }
      },
      refetchQueries: [
        {
          query: LIST_REVENUES,
        },
        {
          query: LIST_EXPENSES,
        },
        {
          query: PATIENT_COUPONS,
          variables: { patientId: patientId, all: false },
        },
        { query: GET_PATIENT, variables: { id: patientId } },
        { query: LIST_INVENTORY },
        { query: LIST_INVENTORY_HISTORY },
        {
          query: GET_INVOICE_COUNTER,
        },
      ],
      onError: ({ message }) => Alert.error(message),
    }
  );
  const [archiveReferedDoctorAppointment] = useMutation(
    ARCHIVE_REFERED_DOCTORAPPOINTMENT,
    {
      onCompleted: () => {
        Alert.success('Appointment has been Archived successfully');
        onArchive && onArchive();
        refetchTodayAppointments();
      },
      onError: ({ message }) => Alert.error(message),
    }
  );
  const [complete] = useMutation(COMPLETE_APPOINTMENT, {
    onCompleted: () => {
      Alert.success('Appointment has been Completed successfully');
      setAppointment({});
      refetchTodayAppointments();
    },
  });
  const [updateNotes] = useMutation(UPDATE_BUSINESS_NOTES, {
    onCompleted: () => {
      Alert.success('Business Notes Added Successfully');
      refetchTodayAppointments();
    },
  });
  const [adjust] = useMutation(ADJUST_APPOINTMENT, {
    onCompleted: () => {
      Alert.success('Appointment has been changed successfully');
      refetchTodayAppointments();
    },
    refetchQueries: [
      {
        query: LIST_APPOINTMENTS,
      },
    ],
  });
  const [confirmedAppointment] = useMutation(CONFIRMED_APPOINTMENT, {
    onCompleted: ({ confirmedAppointment: { id } }) => {
      const newTodayAppointments = R.map(appointment =>
        id === appointment.id
          ? { ...appointment, confirmed: !appointment.confirmed }
          : appointment
      )(todayAppointments);

      updateTodayAppointmentsCache({
        appointments: newTodayAppointments,
        appointmentsCount: todayAppointmentsCount,
      });
    },
  });

  const [cancel] = useMutation(CANCEL_APPOINTMENT, {
    onCompleted: () => {
      Alert.success('Appointment has been cancelled successfully');
      refetchTodayAppointments();
    },
    refetchQueries: [
      {
        query: LIST_APPOINTMENTS,
      },
    ],
  });
  const [transferAppointments] = useMutation(TRANSFER_APPOINTMENTS, {
    onCompleted: () => {
      Alert.success('Appointments has been Transfered successfully');
      refetchTodayAppointments();
    },
  });
  const [deleteAppointmentPhoto] = useMutation(DELETE_APPOINTMENT_PHOTO, {
    onCompleted: () => {
      Alert.success('Appointment Photo has been Deleted successfully');
      onDeletePhoto && onDeletePhoto();
    },
    refetchQueries: [
      {
        query: LIST_APPOINTMENTS,
      },
      {
        query: GET_APPOINTMENT_HISTORY,
        variables: { patientId: patientId, type: type },
      },
    ],
  });

  return useMemo(
    () => ({
      todayAppointments,
      filterBranches,
      deleteAppointmentPhoto,
      confirmedAppointment,
      refetchAppointments: {
        query: LIST_APPOINTMENTS,
      },
      branches: [],
      archive,
      complete,
      archiveLoading,
      updateNotes,
      adjust,
      cancel,
      transferAppointments,
      archiveReferedDoctorAppointment,
      todayAppointmentsCount,
      refetchTodayAppointments,
    }),
    [
      todayAppointments,
      confirmedAppointment,
      deleteAppointmentPhoto,
      filterBranches,
      archive,
      complete,
      archiveLoading,
      updateNotes,
      adjust,
      cancel,
      transferAppointments,
      archiveReferedDoctorAppointment,
      todayAppointmentsCount,
      refetchTodayAppointments,
    ]
  );
}

export default useAppointments;
