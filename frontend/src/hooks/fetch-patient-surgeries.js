import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import client from 'apollo-client/client';
import {
  CREATE_PATIENT_SURGERY,
  LIST_PATIENT_SURGERIES,
} from 'apollo-client/queries/surgery';
import useGlobalState from 'state';

const updateCache = patientSurgeries => {
  client.writeQuery({
    query: LIST_PATIENT_SURGERIES,
    data: {
      patientSurgeries,
    },
  });
};

const usePatientSurgeries = ({ onCreate } = {}) => {
  const { data } = useQuery(LIST_PATIENT_SURGERIES);
  const [clinic] = useGlobalState('currentClinic');
  const patientSurgeries = useMemo(
    () => R.propOr([], 'patientSurgeries')(data),
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
      createPatientSurgery: patientSurgery => {
        createPatientSurgery({
          variables: {
            patientSurgery,
            clinicId: clinic.id,
          },
        });
      },
      updateCache,
    }),
    [clinic.id, createPatientSurgery, patientSurgeries]
  );
};

export default usePatientSurgeries;
