import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_DENTAL_DIAGNOSIS_DEFINITION,
  EDIT_DENTAL_DIAGNOSIS_DEFINITION,
  LIST_DENTAL_DIAGNOSISS_DEFINITION,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myDentalDiagnosissDefinition => {
  client.writeQuery({
    query: LIST_DENTAL_DIAGNOSISS_DEFINITION,
    data: {
      myDentalDiagnosissDefinition,
    },
  });
};

function useDentalDiagnosisDefinition({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_DENTAL_DIAGNOSISS_DEFINITION);
  const dentalDiagnosissDefinition = useMemo(
    () => R.propOr([], 'myDentalDiagnosissDefinition')(data),
    [data]
  );

  const [addDentalDiagnosisDefinition] = useMutation(ADD_DENTAL_DIAGNOSIS_DEFINITION, {
    onCompleted() {
      Alert.success('the Dental Diagnosis has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addDentalDiagnosisDefinition: dentalDiagnosisDefinition } }) {
      updateCache([...dentalDiagnosissDefinition, dentalDiagnosisDefinition]);
    },
    onError() {
      Alert.error('Failed to add new Dental Diagnosis');
    },
  });
  const [editDentalDiagnosisDefinition] = useMutation(EDIT_DENTAL_DIAGNOSIS_DEFINITION, {
    onCompleted() {
      Alert.success('the Dental Diagnosis has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the Dental Diagnosis');
    },
  });

  return useMemo(
    () => ({
      dentalDiagnosissDefinition,
      addDentalDiagnosisDefinition,
      editDentalDiagnosisDefinition,
      updateCache,
    }),
    [dentalDiagnosissDefinition, addDentalDiagnosisDefinition, editDentalDiagnosisDefinition]
  );
}

export default useDentalDiagnosisDefinition;
