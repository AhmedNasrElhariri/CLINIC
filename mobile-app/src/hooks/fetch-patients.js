import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as R from 'ramda';

import { LIST_PATIENTS } from '@/apollo-client/queries';
import client from '@/apollo-client/client';

function useFetchPatients() {
  const { data, refetch, networkStatus } = useQuery(LIST_PATIENTS);
  const patients = useMemo(() => R.propOr([], 'patients')(data), [data]);
  return useMemo(
    () => ({
      patients,
      refetch,
      fetchDone: networkStatus === 7,
      refetching: networkStatus === 4,
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
    [patients, refetch, networkStatus]
  );
}

export default useFetchPatients;
