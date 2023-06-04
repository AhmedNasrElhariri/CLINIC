import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';
import {
  ADD_SALES,
  EDIT_SALES,
  LIST_SALESES,
  DELETE_SALES,
  CONSUME_INVENTORY_MANUAl,
  LIST_INVENTORY_HISTORY,
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

function useSales({
  onCreate,
  onEdit,
  view,
  period,
  specialtyId,
  branchId,
  doctorId,
  userId,
  page = 1,
  itemId,
  creatorId,
  onConsumeInventory,
} = {}) {
  const { data, refetch: refetchSales } = useQuery(LIST_SALESES, {
    variables: Object.assign(
      {
        offset: (page - 1) * 20 || 0,
        limit: 20,
      },
      period && { dateFrom: period[0] },
      period && { dateTo: period[1] },
      view && { view: view },
      branchId && { branchId: branchId },
      specialtyId && { specialtyId: specialtyId },
      doctorId && { doctorId: doctorId },
      itemId && { itemId: itemId },
      creatorId && { creatorId: creatorId }
    ),
    fetchPolicy: 'cache-and-network',
  });
  const salesData = data?.mySaleses;

  const saleses = useMemo(() => R.propOr([], 'sales')(salesData), [salesData]);

  const totalSalesPrice = useMemo(
    () => R.propOr(0, 'totalSalesPrice')(salesData),
    [salesData]
  );

  const totalSalesCost = useMemo(
    () => R.propOr(0, 'totalCost')(salesData),
    [salesData]
  );
  const salesCounts = useMemo(
    () => R.propOr(0, 'salesCounts')(salesData),
    [salesData]
  );
  const [addSales, { loading }] = useMutation(ADD_SALES, {
    onCompleted() {
      Alert.success('the Item has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addSales: sales } }) {
      updateCache([...saleses, ...sales]);
    },
    onError: ({ message }) => Alert.error(message),
  });
  const [editSales, { loading: editLoading }] = useMutation(EDIT_SALES, {
    onCompleted() {
      Alert.success('the Item has been Edited Successfully');
      onEdit && onEdit();
      refetchSales();
    },

    onError() {
      Alert.error('Failed to edit the Item');
    },
  });

  const [deleteSales, { loading: deleteLoading }] = useMutation(DELETE_SALES, {
    onCompleted() {
      Alert.success('the Item has been deleted Successfully');
      onCreate && onCreate();
    },
    refetchQueries: [
      {
        query: LIST_SALESES,
        variables: { offset: 0, limit: 20 },
      },
    ],
    onError() {
      Alert.error('Failed to add new Item');
    },
  });
  const [consumeInventoryManual] = useMutation(CONSUME_INVENTORY_MANUAl, {
    onCompleted() {
      onConsumeInventory && onConsumeInventory();
      refetchSales();
      Alert.success('the Inventory has been Consumed Successfully');
    },
    refetchQueries: [
      { query: LIST_INVENTORY_HISTORY, variables: { isSelling: true } },
    ],
    onError: err => {
      Alert.error(err.message);
    },
  });

  return useMemo(
    () => ({
      saleses,
      totalSalesPrice,
      totalSalesCost,
      salesCounts,
      addSales,
      editSales,
      deleteSales,
      updateCache,
      loading: loading,
      editLoading: editLoading,
      deleteLoading: deleteLoading,
      consumeInventoryManual: data =>
        consumeInventoryManual({
          variables: {
            data,
          },
        }),
    }),
    [
      saleses,
      addSales,
      editSales,
      deleteSales,
      totalSalesPrice,
      totalSalesCost,
      salesCounts,
      loading,
      editLoading,
      deleteLoading,
      consumeInventoryManual,
    ]
  );
}

export default useSales;
