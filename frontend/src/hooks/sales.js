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

function useSales({
  onCreate,
  onEdit,
  view,
  period,
  specialtyId,
  branchId,
  doctorId,
  userId,
  page,
  itemId,
  creatorId,
} = {}) {
  const { data } = useQuery(LIST_SALESES, {
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
  });
  const salesData = data?.mySaleses;

  const saleses = useMemo(() => R.propOr([], 'sales')(salesData), [salesData]);
  const totalSalesPrice = useMemo(
    () => R.propOr(0, 'totalSalesPrice')(salesData),
    [salesData]
  );
  const totalSalesCost = useMemo(
    () => R.propOr(0, 'totalSalesCost')(salesData),
    [salesData]
  );
  const salesCounts = useMemo(
    () => R.propOr(0, 'salesCounts')(salesData),
    [salesData]
  );

  const { data: OrgUsers } = useQuery(LIST_USERS);
  const organizationusers = useMemo(
    () => R.propOr([], 'listUsers')(OrgUsers),
    [OrgUsers]
  );

  // const filteredSales = useMemo(
  //   () => filterAccountingList(saleses, view, period),
  //   [saleses, period, view]
  // );
  // const totalSalesPrice = useMemo(
  //   () => filteredSales.reduce((acc, s) => acc + s.totalPrice, 0),
  //   [filteredSales]
  // );

  // const totalSalesCost = useMemo(
  //   () => filteredSales.reduce((acc, s) => acc + s.totalCost, 0),
  //   [filteredSales]
  // );

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

  const [deleteSales, { loading: deleteLoading }] = useMutation(DELETE_SALES, {
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
      totalSalesPrice,
      totalSalesCost,
      salesCounts,
      organizationusers,
      addSales,
      editSales,
      deleteSales,
      updateCache,
      loading: loading,
      editLoading: editLoading,
      deleteLoading: deleteLoading,
    }),
    [
      saleses,
      addSales,
      editSales,
      deleteSales,
      organizationusers,
      totalSalesPrice,
      totalSalesCost,
      salesCounts,
      loading,
      editLoading,
      deleteLoading,
    ]
  );
}

export default useSales;
