import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_SALES,
  EDIT_SALES,
  LIST_SALESES,
  DELETE_SALES,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = mySaleses => {
  client.writeQuery({
    query: LIST_SALESES,
    data: {
      mySaleses,
    },
  });
};

function useSales({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_SALESES);
  const saleses = useMemo(() => R.propOr([], 'mySaleses')(data), [data]);

  const [addSales] = useMutation(ADD_SALES, {
    onCompleted() {
      Alert.success('the Item has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addSales: sales } }) {
      updateCache([...saleses, sales]);
    },
    onError() {
      Alert.error('Failed to add new Item');
    },
  });
  const [editSales] = useMutation(EDIT_SALES, {
    onCompleted() {
      Alert.success('the Item has been Edited Successfully');
      onEdit && onEdit();
    },
    refetchQueries: [
      {
        query: LIST_SALESES,
      },
    ],
    onError() {
      Alert.error('Failed to edit the Item');
    },
  });

  const [deleteSales] = useMutation(DELETE_SALES, {
    onCompleted() {
      Alert.success('the Item has been deleted Successfully');
      onCreate && onCreate();
    },
    refetchQueries: [
      {
        query: LIST_SALESES,
      },
    ],
    onError() {
      Alert.error('Failed to add new Item');
    },
  });
  return useMemo(
    () => ({
      saleses,
      addSales,
      editSales,
      deleteSales,
      updateCache,
    }),
    [saleses, addSales, editSales, deleteSales]
  );
}

export default useSales;
