import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_SALES_DEFINITION,
  EDIT_SALES_DEFINITION,
  LIST_SALESES_DEFINITION,
  ADD_SALES_DEFINITION_QUENTITY,
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

function useSalesDefinition({ onCreate, onEdit, onDelete } = {}) {
  const { data } = useQuery(LIST_SALESES_DEFINITION);
  const salesesDefinition = useMemo(
    () => R.propOr([], 'mySalesesDefinition')(data),
    [data]
  );
  const [addSalesDefinition, { loading }] = useMutation(ADD_SALES_DEFINITION, {
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
  const [deleteSalesDefinition] = useMutation(EDIT_SALES_DEFINITION, {
    onCompleted() {
      Alert.success('the Item has been Deleted Successfully');
      onDelete && onDelete();
    },
    refetchQueries: [
      {
        query: LIST_SALESES_DEFINITION,
      },
    ],
    onError() {
      Alert.error('Failed to delete the Item');
    },
  });
  const [addSalesDefinitionQuantity] = useMutation(
    ADD_SALES_DEFINITION_QUENTITY,
    {
      onCompleted() {
        Alert.success('the Quantity has been added Successfully');
        onEdit && onEdit();
      },
      onError() {
        Alert.error('Failed to add the quantity');
      },
    }
  );

  return useMemo(
    () => ({
      salesesDefinition,
      addSalesDefinitionQuantity,
      addSalesDefinition,
      editSalesDefinition,
      deleteSalesDefinition,
      updateCache,
      loading,
    }),
    [
      salesesDefinition,
      addSalesDefinition,
      editSalesDefinition,
      deleteSalesDefinition,
      addSalesDefinitionQuantity,
      loading,
    ]
  );
}

export default useSalesDefinition;
