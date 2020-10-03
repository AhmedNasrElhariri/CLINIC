import { useMemo, useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import * as R from 'ramda';
import moment from 'moment';

import { LIST_APPOINTMENTS } from 'apollo-client/queries';
import useGlobalState from 'state';
import client from 'apollo-client/client';

import { sortAppointmentsByDate } from 'services/appointment';

export function useVariables() {
  const [currentClinic] = useGlobalState('currentClinic');
  return useMemo(
    () =>
      !currentClinic || !currentClinic.id
        ? null
        : {
            input: {
              clinicIds: [currentClinic.id],
            },
          },
    [currentClinic]
  );
}

function useFetchAppointments() {
  const variables = useVariables();
  const [fetched, setFetched] = useState(false);
  const [getAppointments, { data }] = useLazyQuery(LIST_APPOINTMENTS, {
    variables,
    onCompleted: () => setFetched(true),
  });

  useEffect(() => {
    if (variables && !fetched) {
      getAppointments();
    }
  }, [data, fetched, getAppointments, variables]);

  const appointments = useMemo(
    () =>
      R.pipe(
        R.propOr([], 'appointments'),
        R.reject(R.propEq('status', 'Cancelled')),
        sortAppointmentsByDate
      )(data),
    [data]
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

    return appointments.filter(({ date }) => {
      const to = from.clone().add(1, 'days');
      return moment(date).isBetween(from, to, 'minutes', '[]');
    });
  }, [appointments]);
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
