import { useEffect, useMemo, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import * as R from 'ramda';

import { LIST_PATIENT_LABS } from 'apollo-client/queries';
import client from 'apollo-client/client';

function useFetchLabDocs({ id } = {}) {
  const [variables, setVariables] = useState(null);

  const [fetch, { data }] = useLazyQuery(LIST_PATIENT_LABS);
  const labDocs = R.propOr([], 'patientLabs')(data);

  useEffect(() => {
    if (!variables) {
      setVariables({
        patientId: id,
      });
    }
  }, [fetch, id, variables]);

  useEffect(() => {
    if (variables) {
      fetch({ variables });
    }
  }, [fetch, id, variables]);

  return useMemo(
    () => ({
      labDocs,
      updateCache: labDocs => {
        client.writeQuery({
          query: LIST_PATIENT_LABS,
          data: {
            patientLabs: labDocs,
          },
          variables,
        });
      },
    }),
    [labDocs, variables]
  );
}

export default useFetchLabDocs;
