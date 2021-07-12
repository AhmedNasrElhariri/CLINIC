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
  status = APPT_STATUS.SCHEDULED,
  specialtyId,
} = {}) {
  const { data } = useQuery(LIST_APPOINTMENTS, {
    variables: Object.assign(
      {
        offset: (page - 1) * 20,
        limit: 20,
        status,
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

  const appointmentsCount = useMemo(
    () => R.propOr(0, 'appointmentsCount')(appointmentsdata),
    [data]
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

  const SpecialtytodayAppointments = useMemo(
    () => todayAppointments.filter(a => a.specialty.id == specialtyId),
    [specialtyId, todayAppointments]
  );

  const specialtyWaitingAppointmentsCount = useMemo(() => {
    const waitingAppointments = SpecialtytodayAppointments.filter(
      a => a.status === 'Waiting'
    );
    const waitingAppointmentsCount = waitingAppointments.length;
    return waitingAppointmentsCount;
  }, [specialtyId, SpecialtytodayAppointments]);

  const { data: branchesTreeData } = useQuery(LIST_BRANCHES_TREE, {
    variables: { action: ACTIONS.List_Appointment },
  });

  const filterBranches = R.propOr([], 'listBranchesTree')(branchesTreeData);
  return useMemo(
    () => ({
      appointments,
      appointmentsCount,
      todayAppointments,
      filterBranches,
      SpecialtytodayAppointments,
      specialtyWaitingAppointmentsCount,
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
      appointmentsCount,
      SpecialtytodayAppointments,
      specialtyWaitingAppointmentsCount,
      specialties,
      doctors,
      filterBranches,
    ]
  );
}

export default useAppointments;
