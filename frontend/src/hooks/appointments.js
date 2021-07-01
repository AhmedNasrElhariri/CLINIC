import { useMemo } from 'react';
import * as R from 'ramda';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { ACTIONS } from 'utils/constants';
import { sortAppointmentsByDate } from 'services/appointment';
import { APPT_TYPE } from 'utils/constants';
import { LIST_APPOINTMENTS, LIST_BRANCHES_TREE } from 'apollo-client/queries';

function useAppointments({ includeSurgery, page } = {}) {
  const { data } = useQuery(LIST_APPOINTMENTS, {
    variables: {
      offset: (page - 1) * 20,
      limit: 20,
    },
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

  const { data: todayAppointmentsData } = useQuery(LIST_APPOINTMENTS);
  const todayAllAppointmentsData = todayAppointmentsData?.appointments;
  const todayAllAppointments = useMemo(
    () =>
      R.pipe(
        R.propOr([], 'appointments'),
        R.reject(R.propEq('status', 'Cancelled')),
        includeSurgery
          ? R.identity
          : R.reject(R.propEq('type', APPT_TYPE.Surgery)),
        sortAppointmentsByDate
      )(todayAllAppointmentsData),
    [todayAllAppointmentsData, includeSurgery]
  );

  const todayAppointments = useMemo(() => {
    const refDate =
      moment().hours() >= 5 ? moment() : moment().subtract(1, 'days');

    const from = refDate.set({
      hours: 6,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });

    return todayAllAppointments.filter(({ date }) => {
      const to = from.clone().add(1, 'days');
      return moment(date).isBetween(from, to, 'minutes', '[]');
    });
  }, [todayAllAppointments]);
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
      branches: [],
      specialties,
      doctors,
    }),
    [
      appointments,
      todayAppointments,
      appointmentsCount,
      specialties,
      doctors,
      filterBranches,
    ]
  );
}

export default useAppointments;
