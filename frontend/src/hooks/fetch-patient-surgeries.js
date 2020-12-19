import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import client from 'apollo-client/client';
import {
  CREATE_PATIENT_SURGERY,
  LIST_PATIENT_SURGERIES,
} from 'apollo-client/queries/surgery';

const updateCache = myPatientSurgeries => {
  client.writeQuery({
    query: LIST_PATIENT_SURGERIES,
    data: {
      myPatientSurgeries,
    },
  });
};

function usePatientSurgeries({ onCreate } = {}) {
  const { data } = useQuery(LIST_PATIENT_SURGERIES);
  const patientSurgeries = useMemo(
    () => R.propOr([], 'myPatientSurgeries')(data),
    [data]
  );

  const [createPatientSurgery] = useMutation(CREATE_PATIENT_SURGERY, {
    onCompleted() {
      Alert.success('the Surgery has been created Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { createPatientSurgery: surgery } }) {
      updateCache([...patientSurgeries, surgery]);
    },
    onError() {
      Alert.error('Failed to create new Surgery');
    },
  });

  return useMemo(
    () => ({
      patientSurgeries,
      createPatientSurgery,
      updateCache,
    }),
    [createPatientSurgery, patientSurgeries]
  );
}

export default usePatientSurgeries;
