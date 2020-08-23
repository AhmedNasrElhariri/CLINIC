import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import * as R from 'ramda';

import { LIST_PATIENTS } from 'apollo-client/queries';
import useGlobalState from 'state';
import client from 'apollo-client/client';

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

function useFetchPatients() {
  const { data } = useQuery(LIST_PATIENTS, {
    variables: {},
  });
  const patients = useMemo(() => R.propOr([], 'patients')(data), [data]);
  return useMemo(
    () => ({
      patients,
      updateCache: patients => {
        client.writeQuery({
          query: LIST_PATIENTS,
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
