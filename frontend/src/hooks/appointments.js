import React, { useMemo } from "react";
import * as R from "ramda";
import { useQuery, useMutation } from "@apollo/client";
import { APPT_TYPE, APPT_STATUS } from "utils/constants";
import {
  LIST_APPOINTMENTS,
  LIST_BRANCHES_TREE,
  LIST_TODAY_APPOINTMENTS,
  APPOINTMENTS_DAY_COUNT,
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
} from "apollo-client/queries";
import client from "apollo-client/client";
import { Alert } from "rsuite";

const updateCache = (myAppointments) => {
  client.writeQuery({
    query: LIST_APPOINTMENTS,
    data: {
      myAppointments,
    },
  });
};
const updateCacheTwo = (myAppointments) => {
  client.writeQuery({
    query: LIST_TODAY_APPOINTMENTS,
    data: {
      myAppointments,
    },
  });
};

function useAppointments({
  includeSurgery,
  page,
  dateFrom,
  dateTo,
  patient,
  type,
  status = APPT_STATUS.SCHEDULED,
  date,
  userId,
  action,
  patientId,
  onDeletePhoto,
  setFollowUp,
  setPopUp,
  open,
  followUpFeature,
  canAddFollowUp,
  setAppointment,
} = {}) {
  const { data } = useQuery(LIST_APPOINTMENTS, {
    variables: Object.assign(
      {
        offset: (page - 1) * 20 || 0,
        limit: 20,
        status,
        patient,
      },
      dateFrom && { dateFrom },
      dateTo && { dateTo },
      type && { type }
    ),
  });

  const appointmentsdata = data?.appointments;
  const appointmentsCountNumber = R.propOr(
    [],
    "appointmentsCount"
  )(appointmentsdata);
  const appointments = useMemo(
    () =>
      R.pipe(
        R.propOr([], "appointments"),
        // R.reject(R.propEq('status', 'Cancelled')),
        includeSurgery
          ? R.identity
          : R.reject(R.propEq("type", APPT_TYPE.Surgery))
      )(appointmentsdata),
    [data, includeSurgery]
  );
  const pages = Math.ceil(appointmentsCountNumber / 20);
  const { data: appointmentsDay } = useQuery(APPOINTMENTS_DAY_COUNT, {
    variables: {
      date: date,
      userId: userId,
    },
  });
  const appointmentsCount = useMemo(
    () => R.propOr({}, "appointmentsDayCount")(appointmentsDay),
    [date, appointmentsDay]
  );

  const specialties = useMemo(
    () => R.pipe(R.propOr([], "specialties"))(data),
    [data]
  );

  const doctors = useMemo(() => R.pipe(R.propOr([], "doctors"))(data), [data]);

  const { data: todayAppointmentsData } = useQuery(LIST_TODAY_APPOINTMENTS);
  const todayAppointments = useMemo(
    () =>
      R.pipe(
        R.propOr([], "todayAppointments"),
        R.reject(R.propEq("status", "Cancelled")),
        includeSurgery
          ? R.identity
          : R.reject(R.propEq("type", APPT_TYPE.Surgery))
      )(todayAppointmentsData),
    [todayAppointmentsData, includeSurgery]
  );

  const { data: branchesTreeData } = useQuery(LIST_BRANCHES_TREE, {
    variables: { action: action },
  });
  const filterBranches = useMemo(
    () => R.propOr([], "listBranchesTree")(branchesTreeData),
    [branchesTreeData]
  );

  const [archive, { loading: archiveLoading }] = useMutation(
    ARCHIVE_APPOINTMENT,
    {
      onCompleted: () => {
        Alert.success("Appointment has been Archived successfully");
        if (followUpFeature && canAddFollowUp) {
          setFollowUp(true);
          setPopUp("followUpAppointment");
          open();
        }
      },
      refetchQueries: [
        {
          query: LIST_TODAY_APPOINTMENTS,
        },
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
        { query: LIST_INVENTORY },
        { query: LIST_INVENTORY_HISTORY },
        {
          query: GET_INVOICE_COUNTER,
        },
      ],
    }
  );
  const [complete] = useMutation(COMPLETE_APPOINTMENT, {
    onCompleted: () => {
      Alert.success("Appointment has been Completed successfully");
      setAppointment({});
    },
    refetchQueries: [
      {
        query: LIST_TODAY_APPOINTMENTS,
      },
    ],
    // update(cache, { data: { completeAppointment: completeApp } }) {
    //   const apps = todayAppointments.map((app) => {
    //     if (app.id === completeApp.id) {
    //       return { ...app, status: "Archived" };
    //     } else {
    //       return app;
    //     }
    //   });
    //   updateCacheTwo(apps);
    // },
  });
  const [updateNotes] = useMutation(UPDATE_BUSINESS_NOTES, {
    onCompleted: () => {
      Alert.success("Business Notes Added Successfully");
    },
    update(cache, { data: { updateNotes: appointment } }) {
      const app = appointments.find((a) => a.id == appointment.id);
      const newApp = { ...app, businessNotes: appointment.businessNotes };
      const allNewApp = appointments.map((oldApp) => {
        if (oldApp.id == appointment.id) {
          return newApp;
        } else {
          return oldApp;
        }
      });
      updateCache(allNewApp);
    },
    refetchQueries: [
      {
        query: LIST_TODAY_APPOINTMENTS,
      },
    ],
  });
  const [adjust] = useMutation(ADJUST_APPOINTMENT, {
    onCompleted: ({ adjustAppointment }) => {
      Alert.success("Appointment has been changed successfully");
    },
    refetchQueries: [
      {
        query: LIST_TODAY_APPOINTMENTS,
      },
    ],
  });
  const [confirmedAppointment] = useMutation(CONFIRMED_APPOINTMENT, {
    onCompleted: ({}) => {},
    refetchQueries: [
      {
        query: LIST_TODAY_APPOINTMENTS,
      },
    ],
  });
  const [cancel] = useMutation(CANCEL_APPOINTMENT, {
    onCompleted: () => {
      Alert.success("Appointment has been cancelled successfully");
    },
    refetchQueries: [
      {
        query: LIST_APPOINTMENTS,
      },
    ],
  });

  const [deleteAppointmentPhoto] = useMutation(DELETE_APPOINTMENT_PHOTO, {
    onCompleted: () => {
      Alert.success("Appointment Photo has been Deleted successfully");
      onDeletePhoto && onDeletePhoto();
    },
    refetchQueries: [
      {
        query: LIST_APPOINTMENTS,
      },
      {
        query: GET_APPOINTMENT_HISTORY,
        variables: { patientId: patientId },
      },
    ],
  });

  return useMemo(
    () => ({
      appointments,
      todayAppointments,
      filterBranches,
      appointmentsCount,
      deleteAppointmentPhoto,
      confirmedAppointment,
      refetchAppointments: {
        query: LIST_APPOINTMENTS,
      },
      branches: [],
      specialties,
      pages,
      doctors,
      archive,
      complete,
      archiveLoading,
      updateNotes,
      adjust,
      cancel,
    }),
    [
      appointments,
      appointmentsCount,
      todayAppointments,
      specialties,
      confirmedAppointment,
      deleteAppointmentPhoto,
      pages,
      doctors,
      filterBranches,
      archive,
      complete,
      archiveLoading,
      updateNotes,
      adjust,
      cancel,
    ]
  );
}

export default useAppointments;
