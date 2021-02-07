import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_MEDICINE_DEFINITION,
  EDIT_MEDICINE_DEFINITION,
  LIST_MEDICINES_DEFINITION,
} from 'apollo-client/queries/medicine-definition';
import client from 'apollo-client/client';

const updateCache = myMedicinesDefinition => {
  client.writeQuery({
    query: LIST_MEDICINES_DEFINITION,
    data: {
      myMedicinesDefinition,
    },
  });
};

function useMedicinesDefinition({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_MEDICINES_DEFINITION);
  const medicinesDefinition = useMemo(
    () => R.propOr([], 'myMedicinesDefinition')(data),
    [data]
  );
  console.log(data);

  const [addMedicineDefinition] = useMutation(ADD_MEDICINE_DEFINITION, {
    onCompleted() {
      Alert.success('the medicine has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addMedicineDefinition: medicineDefinition } }) {
      updateCache([...medicinesDefinition, medicineDefinition]);
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
      medicinesDefinition,
      addMedicineDefinition,
      editMedicineDefinition,
      updateCache,
    }),
    [medicinesDefinition, addMedicineDefinition, editMedicineDefinition]
  );
}

export default useMedicinesDefinition;
