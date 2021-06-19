import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';
import { filterAccountingList } from 'utils/accounting';
import {
  ADD_SALES,
  EDIT_SALES,
  LIST_SALESES,
  DELETE_SALES,
  LIST_USERS,
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

function useSales({ onCreate, onEdit, view, period } = {}) {
  const { data } = useQuery(LIST_SALESES);
  const saleses = useMemo(() => R.propOr([], 'mySaleses')(data), [data]);
  const { data: OrgUsers } = useQuery(LIST_USERS);
  const organizationusers = useMemo(
    () => R.propOr([], 'listUsers')(OrgUsers),
    [OrgUsers]
  );
  const filteredSales = useMemo(
    () => filterAccountingList(saleses, view, period),
    [saleses, period, view]
  );

  const totalSalesPrice = useMemo(
    () => filteredSales.reduce((acc, s) => acc + s.totalPrice, 0),
    [filteredSales]
  );

  const totalSalesCost = useMemo(
    () => filteredSales.reduce((acc, s) => acc + s.totalCost, 0),
    [filteredSales]
  );

  const [addSales] = useMutation(ADD_SALES, {
    onCompleted() {
      Alert.success('the Item has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addSales: sales } }) {
      updateCache([...saleses, ...sales]);
    },
    onError: ({ message }) => Alert.error(message) ,
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
      filteredSales,
      totalSalesPrice,
      totalSalesCost,
      organizationusers,
      addSales,
      editSales,
      deleteSales,
      updateCache,
    }),
    [
      saleses,
      addSales,
      editSales,
      deleteSales,
      organizationusers,
      filteredSales,
      totalSalesPrice,
      totalSalesCost,
    ]
  );
}

export default useSales;
