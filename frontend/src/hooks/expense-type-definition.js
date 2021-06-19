import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_EXPENSE_TYPE_DEFINITION,
  EDIT_EXPENSE_TYPE_DEFINITION,
  LIST_EXPENSE_TYPES_DEFINITION,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myExpenseTypesDefinition => {
  client.writeQuery({
    query: LIST_EXPENSE_TYPES_DEFINITION,
    data: {
      myExpenseTypesDefinition,
    },
  });
};

function useExpenseTypeDefinition({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_EXPENSE_TYPES_DEFINITION);
  const expenseTypesDefinition = useMemo(
    () => R.propOr([], 'myExpenseTypesDefinition')(data),
    [data]
  );

  const [addExpenseTypeDefinition] = useMutation(ADD_EXPENSE_TYPE_DEFINITION, {
    onCompleted() {
      Alert.success('the ExpenseType has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addExpenseTypeDefinition: expenseTypeDefinition } }) {
      updateCache([...expenseTypesDefinition, expenseTypeDefinition]);
    },
    onError() {
      Alert.error('Failed to add new ExpenseType');
    },
  });
  const [editExpenseTypeDefinition] = useMutation(EDIT_EXPENSE_TYPE_DEFINITION, {
    onCompleted() {
      Alert.success('the ExpenseType has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the ExpenseType');
    },
  });

  return useMemo(
    () => ({
      expenseTypesDefinition,
      addExpenseTypeDefinition,
      editExpenseTypeDefinition,
      updateCache,
    }),
    [expenseTypesDefinition, addExpenseTypeDefinition, editExpenseTypeDefinition]
  );
}

export default useExpenseTypeDefinition;
