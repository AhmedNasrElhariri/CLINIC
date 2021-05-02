import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_SALES_DEFINITION,
  EDIT_SALES_DEFINITION,
  LIST_SALESES_DEFINITION,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = mySalesesDefinition => {
  client.writeQuery({
    query: LIST_SALESES_DEFINITION,
    data: {
      mySalesesDefinition,
    },
  });
};

function useSalesDefinition({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_SALESES_DEFINITION);
  const salesesDefinition = useMemo(
    () => R.propOr([], 'mySalesesDefinition')(data),
    [data]
  );

  const [addSalesDefinition] = useMutation(ADD_SALES_DEFINITION, {
    onCompleted() {
      Alert.success('the Item has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addSalesDefinition: salesDefinition } }) {
      updateCache([...salesesDefinition, salesDefinition]);
    },
    onError() {
      Alert.error('Failed to add new Item');
    },
  });
  const [editSalesDefinition] = useMutation(EDIT_SALES_DEFINITION, {
    onCompleted() {
      Alert.success('the Item has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the Item');
    },
  });

  return useMemo(
    () => ({
      salesesDefinition,
      addSalesDefinition,
      editSalesDefinition,
      updateCache,
    }),
    [salesesDefinition, addSalesDefinition, editSalesDefinition]
  );
}

export default useSalesDefinition;