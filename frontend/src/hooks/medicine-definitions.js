import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_MEDICINE_DEFINITION,
  EDIT_MEDICINE_DEFINITION,
  LIST_MEDICINES_DEFINITION,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myMedicinesDefinition => {
  client.writeQuery({
    query: LIST_MEDICINES_DEFINITION,
    data: {
      myMedicinesDefinition,
    },
  });
};

function useMedicineDefinitions({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_MEDICINES_DEFINITION);
  const medicines = useMemo(() => R.propOr([], 'myMedicinesDefinition')(data), [
    data,
  ]);

  const [addMedicineDefinition] = useMutation(ADD_MEDICINE_DEFINITION, {
    onCompleted() {
      Alert.success('the medicine has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addMedicineDefinition: medicineDefinition } }) {
      updateCache([...medicines, medicineDefinition]);
    },
    onError() {
      Alert.error('Failed to add new Medicine');
    },
  });
  const [editMedicineDefinition] = useMutation(EDIT_MEDICINE_DEFINITION, {
    onCompleted() {
      Alert.success('the Medicine has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the Medicine');
    },
  });

  return useMemo(
    () => ({
      medicines,
      addMedicineDefinition,
      editMedicineDefinition,
      updateCache,
    }),
    [addMedicineDefinition, editMedicineDefinition, medicines]
  );
}

export default useMedicineDefinitions;
