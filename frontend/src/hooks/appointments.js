import { useMemo } from 'react';
import * as R from 'ramda';
import moment from 'moment';
import { useQuery } from '@apollo/client';
import { ACTIONS } from 'utils/constants';
import { sortAppointmentsByDate } from 'services/appointment';
import { APPT_TYPE } from 'utils/constants';
import {
  LIST_APPOINTMENTS,
  LIST_BRANCHES_TREE,
} from 'apollo-client/queries';

function useAppointments({ includeSurgery } = {}) {
  const { data } = useQuery(LIST_APPOINTMENTS);

  const appointments = useMemo(
    () =>
      R.pipe(
        R.propOr([], 'appointments'),
        R.reject(R.propEq('status', 'Cancelled')),
        includeSurgery
          ? R.identity
          : R.reject(R.propEq('type', APPT_TYPE.Surgery)),
        sortAppointmentsByDate
      )(data),
    [data, includeSurgery]
  );

  const specialties = useMemo(() => R.pipe(R.propOr([], 'specialties'))(data), [
    data,
  ]);

  const doctors = useMemo(() => R.pipe(R.propOr([], 'doctors'))(data), [data]);

  const todayAppointments = useMemo(() => {
    const refDate =
      moment().hours() >= 5 ? moment() : moment().subtract(1, 'days');

    const from = refDate.set({
      hours: 6,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });

    return appointments.filter(({ date }) => {
      const to = from.clone().add(1, 'days');
      return moment(date).isBetween(from, to, 'minutes', '[]');
    });
  }, [appointments]);

  const { data: branchesTreeData } = useQuery(LIST_BRANCHES_TREE, {
    variables: { action: ACTIONS.List_Appointment },
  });
  const filterBranches = R.propOr([], 'listBranchesTree')(branchesTreeData);
  return useMemo(
    () => ({
      appointments,
      todayAppointments,
      filterBranches,
      branches: [],
      specialties,
      doctors,
    }),
    [appointments, todayAppointments, specialties, doctors, filterBranches]
  );
}

export default useAppointments;
