import React, { useMemo } from 'react';
import * as R from 'ramda';
import { useQuery, useMutation } from '@apollo/client';
import { APPT_TYPE, APPT_STATUS } from 'utils/constants';
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
} from 'apollo-client/queries';
import { Alert } from 'rsuite';

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
  const appointmentsCountNumber = useMemo(() => {
    const Data = R.propOr({}, 'appointments')(data);
    const pagesNumber = Data?.appointmentsCount;
    return pagesNumber;
  }, [data]);
  const appointments = useMemo(
    () =>
      R.pipe(
        R.propOr([], 'appointments'),
        R.reject(R.propEq('status', 'Cancelled')),
        includeSurgery
          ? R.identity
          : R.reject(R.propEq('type', APPT_TYPE.Surgery))
      )(appointmentsdata),
    [data, includeSurgery]
  );
  const { data: appointmentsDay } = useQuery(APPOINTMENTS_DAY_COUNT, {
    variables: {
      date: date,
      userId: userId,
    },
  });
  const appointmentsCount = useMemo(
    () => R.propOr({}, 'appointmentsDayCount')(appointmentsDay),
    [date, appointmentsDay]
  );

  const specialties = useMemo(
    () => R.pipe(R.propOr([], 'specialties'))(data),
    [data]
  );

  const doctors = useMemo(() => R.pipe(R.propOr([], 'doctors'))(data), [data]);

  const { data: todayAppointmentsData } = useQuery(LIST_TODAY_APPOINTMENTS);
  const todayAppointments = useMemo(
    () =>
      R.pipe(
        R.propOr([], 'todayAppointments'),
        R.reject(R.propEq('status', 'Cancelled')),
        includeSurgery
          ? R.identity
          : R.reject(R.propEq('type', APPT_TYPE.Surgery))
      )(todayAppointmentsData),
    [todayAppointmentsData, includeSurgery]
  );

  const { data: branchesTreeData } = useQuery(LIST_BRANCHES_TREE, {
    variables: { action: action },
  });
  const filterBranches = useMemo(
    () => R.propOr([], 'listBranchesTree')(branchesTreeData),
    [branchesTreeData]
  );

  const [archive, { loading: archiveLoading }] = useMutation(
    ARCHIVE_APPOINTMENT,
    {
      onCompleted: () => {
        Alert.success('Appointment has been Archived successfully');
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
        { query: LIST_INVENTORY },
        { query: LIST_INVENTORY_HISTORY },
      ],
    }
  );
  const [complete] = useMutation(COMPLETE_APPOINTMENT, {
    onCompleted: () => {
      Alert.success('Appointment has been Completed successfully');
    },
    refetchQueries: [
      {
        query: LIST_APPOINTMENTS,
        variables: { offset: 0, limit: 20 },
      },
    ],
  });
  const [updateNotes] = useMutation(UPDATE_BUSINESS_NOTES, {
    onCompleted: () => {
      Alert.success('Business Notes Added Successfully');
    },
    refetchQueries: [
      {
        query: LIST_APPOINTMENTS,
        variables: { offset: 0, limit: 20 },
      },
    ],
  });

  return useMemo(
    () => ({
      appointments,
      todayAppointments,
      filterBranches,
      appointmentsCount,
      refetchAppointments: {
        query: LIST_APPOINTMENTS,
      },
      branches: [],
      specialties,
      appointmentsCountNumber,
      doctors,
      archive,
      complete,
      archiveLoading,
      updateNotes,
    }),
    [
      appointments,
      appointmentsCount,
      todayAppointments,
      specialties,
      appointmentsCountNumber,
      doctors,
      filterBranches,
      archive,
      complete,
      archiveLoading,
      updateNotes,
    ]
  );
}

export default useAppointments;
