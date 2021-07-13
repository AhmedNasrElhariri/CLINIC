import { useMemo } from 'react';
import * as R from 'ramda';
import { useQuery } from '@apollo/client';
import { ACTIONS } from 'utils/constants';
import { sortAppointmentsByDate } from 'services/appointment';
import { APPT_TYPE,APPT_STATUS } from 'utils/constants';
import {
  LIST_APPOINTMENTS,
  LIST_BRANCHES_TREE,
  LIST_TODAY_APPOINTMENTS,
} from 'apollo-client/queries';

function useAppointments({
  includeSurgery,
  page,
  dateFrom,
  dateTo,
  patient,
  type,
  status = APPT_STATUS.SCHEDULED,
  specialtyId,
} = {}) {
  const { data } = useQuery(LIST_APPOINTMENTS, {
    variables: Object.assign(
      {
        offset: (page - 1) * 20,
        limit: 20,
        status,
        patient,
        type,
      },
      dateFrom && { dateFrom },
      dateTo && { dateTo }
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
          : R.reject(R.propEq('type', APPT_TYPE.Surgery)),
        sortAppointmentsByDate
      )(appointmentsdata),
    [data, includeSurgery]
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
          : R.reject(R.propEq('type', APPT_TYPE.Surgery)),
        sortAppointmentsByDate
      )(todayAppointmentsData),
    [todayAppointmentsData, includeSurgery]
  );

  
  const { data: branchesTreeData } = useQuery(LIST_BRANCHES_TREE, {
    variables: { action: ACTIONS.List_Appointment },
  });

  const filterBranches = R.propOr([], 'listBranchesTree')(branchesTreeData);
  return useMemo(
    () => ({
      appointments,
      todayAppointments,
      filterBranches,
      refetchAppointments: {
        query: LIST_APPOINTMENTS,
      },
      branches: [],
      specialties,
      doctors,
    }),
    [
      appointments,
      todayAppointments,
      specialties,
      doctors,
      filterBranches,
    ]
  );
}

export default useAppointments;
