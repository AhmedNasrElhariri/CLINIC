import { useEffect, useMemo } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Alert } from 'rsuite';
import * as R from 'ramda';

import {
  LIST_PATIENT_LABS,
  INSRET_LAB_RESULT,
  DELETE_LAB_PHOTO,
} from 'apollo-client/queries';
import { LAB_STATUS } from 'utils/constants';

function usePatientLabs({ patientId, onInsert, onDelete } = {}) {
  const [getPendingLabs, { data, called, refetch }] = useLazyQuery(
    LIST_PATIENT_LABS,
    {
      variables: { patientId },
    }
  );

  const labs = useMemo(
    () =>
      R.pipe(
        R.propOr([], 'patientLabs'),
        R.map(l => ({ ...l, ...l.labDefinition }))
      )(data),
    [data]
  );

  const pendingLabs = useMemo(
    () =>
      R.filter(R.propOr('status', LAB_STATUS.PENDING || LAB_STATUS.DRAFT))(
        labs
      ),
    [labs]
  );
  const historyLabs = useMemo(
    () => R.filter(R.propEq('status', LAB_STATUS.COMPLETED))(labs),
    [labs]
  );

  const [insertLabResult] = useMutation(INSRET_LAB_RESULT, {
    onCompleted: () => {
      Alert.success('Lab Document has been uploaded successfully');
      onInsert && onInsert();
      refetch();
    },
  });
  const [deleteLabPhoto] = useMutation(DELETE_LAB_PHOTO, {
    onCompleted: () => {
      Alert.success('Lab Document has been Deleted successfully');
      onDelete && onDelete();
      refetch();
    },
  });
  useEffect(() => {
    if (patientId) {
      getPendingLabs();
    }
  }, [called, getPendingLabs, patientId]);

  return useMemo(
    () => ({
      pendingLabs,
      historyLabs,
      insertLabResult: lab => insertLabResult({ variables: { lab } }),
      deleteLabPhoto,
    }),
    [historyLabs, insertLabResult, pendingLabs, deleteLabPhoto]
  );
}

export default usePatientLabs;
