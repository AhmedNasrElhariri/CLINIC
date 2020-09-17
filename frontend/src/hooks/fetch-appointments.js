import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import * as R from 'ramda';
import moment from 'moment';

import { LIST_APPOINTMENTS } from 'apollo-client/queries';
import useGlobalState from 'state';
import client from 'apollo-client/client';

import { sortAppointmentsByDate } from 'services/appointment';

export function useVariables() {
  const [currentClinic] = useGlobalState('currentClinic');
  if (!currentClinic) {
    return {};
  }
  return {
    input: {
      clinicIds: [currentClinic.id],
    },
  };
}

function useFetchAppointments() {
  const variables = useVariables();
  const { data } = useQuery(LIST_APPOINTMENTS, {
    variables,
  });
  const appointments = useMemo(
    () =>
      R.pipe(
        R.propOr([], 'appointments'),
        R.reject(R.propEq('status', 'Cancelled')),
        sortAppointmentsByDate
      )(data),
    [data]
  );
  const todayAppointments = useMemo(
    () =>
      appointments.filter(({ date }) => {
        const from = moment({
          hours: 6,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        });
        const to = from.clone().add(1, 'days');
        return moment(date).isBetween(from, to, 'minutes', '[]');
      }),
    [appointments]
  );
  return useMemo(
    () => ({
      appointments,
      todayAppointments,
      updateCache: appointments => {
        client.writeQuery({
          query: LIST_APPOINTMENTS,
          variables,
          data: {
            appointments,
          },
        });
      },
    }),
    [appointments, todayAppointments, variables]
  );
}

export default useFetchAppointments;
