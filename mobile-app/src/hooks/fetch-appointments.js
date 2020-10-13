import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as R from 'ramda';
import moment from 'moment';

import { LIST_APPOINTMENTS } from '@/apollo-client/queries';
import client from '@/apollo-client/client';

import { sortAppointmentsByDate } from '@/services/appointment';
import useUserInfo from './fetch-user-info';

export function useVariables(ids = []) {
  const { clinics } = useUserInfo();
  if (!clinics.length) {
    return {};
  }
  return {
    input: {
      clinicIds: clinics.map(c => c.id),
    },
  };
}

function useFetchAppointments() {
  const variables = useVariables();
  const { data, refetch, networkStatus, loading } = useQuery(
    LIST_APPOINTMENTS,
    {
      variables,
    }
  );
  const appointments = useMemo(
    () => R.pipe(R.propOr([], 'appointments'), sortAppointmentsByDate)(data),
    [data]
  );
  const todayAppointments = useMemo(
    () =>
      appointments.filter(({ date }) =>
        moment(date).isSame(new Date(), 'days')
      ),
    [appointments]
  );

  return useMemo(
    () => ({
      appointments,
      todayAppointments,
      fetching: loading,
      refetch,
      fetchDone: networkStatus === 7,
      refetching: networkStatus === 4,
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
    [
      appointments,
      todayAppointments,
      variables,
      refetch,
      loading,
      networkStatus,
    ]
  );
}

export default useFetchAppointments;
