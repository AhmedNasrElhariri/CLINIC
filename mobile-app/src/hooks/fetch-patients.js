import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as R from 'ramda';
import moment from 'moment';

import { LIST_APPOINTMENTS, LIST_PATIENTS } from '@/apollo-client/queries';
import useGlobalState from '@/state';
import client from '@/apollo-client/client';

import { sortAppointmentsByDate } from '@/services/appointment';

export function useVariables() {
  const [currentClinic] = useGlobalState('currentClinic');
  if (!currentClinic) {
    return {};
  }
  return {
    // input: {
    //   // clinicIds: [currentClinic.id],
    //   // clinicIds: ['ac9821c3-9a54-4dad-a0ef-dc3bb684d5e4'],
    // },
  };
}

function useFetchPatients() {
  // const variables = useVariables();
  const { data } = useQuery(LIST_PATIENTS);
  const patients = useMemo(() => R.propOr([], 'patients')(data), [data]);
  return useMemo(
    () => ({
      patients,
      updateCache: patients => {
        client.writeQuery({
          query: LIST_PATIENTS,
          // variables,
          data: {
            patients,
          },
        });
      },
    }),
    [patients]
  );
}

export default useFetchPatients;
