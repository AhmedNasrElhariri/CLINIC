import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_MATERIAL_DEFINITION,
  EDIT_MATERIAL_DEFINITION,
  LIST_MATERIALS_DEFINITION,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myMaterialsDefinition => {
  client.writeQuery({
    query: LIST_MATERIALS_DEFINITION,
    data: {
      myMaterialsDefinition,
    },
  });
};

function useMaterialDefinition({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_MATERIALS_DEFINITION);
  const materialsDefinition = useMemo(
    () => R.propOr([], 'myMaterialsDefinition')(data),
    [data]
  );

  const [addMaterialDefinition] = useMutation(ADD_MATERIAL_DEFINITION, {
    onCompleted() {
      Alert.success('the Material has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addMaterialDefinition: materialDefinition } }) {
      updateCache([...materialsDefinition, materialDefinition]);
    },
    onError() {
      Alert.error('Failed to add new Material');
    },
  });
  const [editMaterialDefinition] = useMutation(EDIT_MATERIAL_DEFINITION, {
    onCompleted() {
      Alert.success('the Material has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the Material');
    },
  });

  return useMemo(
    () => ({
      materialsDefinition,
      addMaterialDefinition,
      editMaterialDefinition,
      updateCache,
    }),
    [materialsDefinition, addMaterialDefinition, editMaterialDefinition]
  );
}

export default useMaterialDefinition;
