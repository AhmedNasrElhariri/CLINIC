import React, { useMemo } from 'react';
import * as R from 'ramda';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { ACTIONS } from 'utils/constants';
import { APPT_TYPE, APPT_STATUS } from 'utils/constants';
import {
  LIST_APPOINTMENTS,
  LIST_BRANCHES_TREE,
  LIST_TODAY_APPOINTMENTS,
  APPOINTMENTS_DAY_COUNT,
} from 'apollo-client/queries';

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
      doctors,
    }),
    [
      appointments,
      appointmentsCount,
      todayAppointments,
      specialties,
      doctors,
      filterBranches,
    ]
  );
}

export default useAppointments;
