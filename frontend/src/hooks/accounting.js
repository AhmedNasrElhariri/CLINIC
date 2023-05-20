import { useMemo, useEffect } from 'react';
import * as R from 'ramda';
import { useQuery, useLazyQuery } from '@apollo/client';
import {
  LIST_EXPENSES,
  LIST_REVENUES,
  LIST_ALL_EXPENSES,
  LIST_ALL_REVENUES,
  LIST_ACCOUNTING_DATA,
} from 'apollo-client/queries';

import { ACTIONS } from 'utils/constants';

const useAccounting = ({
  view,
  period,
  specialtyId,
  branchId,
  userId,
  page,
  expensePage,
  doctorId,
  expenseSpecialtyId,
  expenseBranchId,
  expenseDoctorId,
  revenueName,
  expenseType,
  expenseName,
  accountingOption,
  printOrNot,
  refetchRe,
  setRefetchRe,
  refetchEx,
  setRefetchEx,
  orderByOption,
  name,
  transactionType,
  bankId,
} = {}) => {
  const { data: expenseData, refetch: refetchExpenses } = useQuery(
    LIST_EXPENSES,
    {
      variables: Object.assign(
        {
          action: ACTIONS.View_Accounting,
          offset: (expensePage - 1) * 20 || 0,
          limit: 20,
        },
        period && { dateFrom: period[0] },
        period && { dateTo: period[1] },
        view && { view: view },
        expenseType && { expenseType: expenseType },
        expenseBranchId && { branchId: expenseBranchId },
        expenseSpecialtyId && { specialtyId: expenseSpecialtyId },
        expenseDoctorId && { doctorId: expenseDoctorId },
        expenseName && { expenseName: expenseName }
      ),
    }
  );
  const { data: revenueData, refetch } = useQuery(LIST_REVENUES, {
    variables: Object.assign(
      {
        action: ACTIONS.View_Accounting,
        offset: (page - 1) * 20 || 0,
        limit: 20,
      },
      period && { dateFrom: period[0] },
      period && { dateTo: period[1] },
      view && { view: view },
      branchId && { branchId: branchId },
      specialtyId && { specialtyId: specialtyId },
      doctorId && { doctorId: doctorId },
      revenueName && { revenueName: revenueName },
      orderByOption && { orderByOption: orderByOption }
    ),
    fetchPolicy: 'network-only',
  });
  const { data: accountingDATA } = useQuery(LIST_ACCOUNTING_DATA, {
    variables: Object.assign(
      {
        action: ACTIONS.View_Accounting,
        offset: (page - 1) * 20 || 0,
        limit: 20,
        transactionType: transactionType,
      },
      period && { dateFrom: period[0] },
      period && { dateTo: period[1] },
      view && { view: view },
      branchId && { branchId: branchId },
      specialtyId && { specialtyId: specialtyId },
      doctorId && { doctorId: doctorId },
      name && { name: name },
      accountingOption && { accountingOption: accountingOption },
      bankId && { bankId: bankId }
    ),
  });

  const revenuesData = revenueData?.revenues;
  const revenues = useMemo(() => {
    return accountingOption === 'Expense'
      ? []
      : R.propOr([], 'revenues')(revenuesData);
  }, [revenueData]);

  const expensesData = expenseData?.expenses;
  const expenses =
    accountingOption === 'Revenue'
      ? []
      : R.propOr([], 'expenses')(expensesData);

  const totalRevenues = useMemo(() => {
    return accountingOption === 'Expense'
      ? 0
      : R.propOr(0, 'totalRevenues')(revenuesData);
  }, [revenuesData, accountingOption]);

  const RevenuesCount = useMemo(() => {
    return accountingOption === 'Expense'
      ? 0
      : R.propOr(0, 'revenuesCount')(revenuesData);
  }, [revenuesData, accountingOption]);

  const totalExpenses = useMemo(() => {
    return accountingOption === 'Revenue'
      ? 0
      : R.propOr(0, 'totalExpenses')(expensesData);
  }, [expensesData, accountingOption]);
  const expensesCount = useMemo(() => {
    return accountingOption === 'Revenue'
      ? 0
      : R.propOr(0, 'expensesCount')(expensesData);
  }, [expensesData, accountingOption]);
  ////

  const accountingTransactionsData = accountingDATA?.accountingData;
  const accountingTransations = useMemo(() => {
    return R.propOr([], 'data')(accountingTransactionsData);
  }, [accountingDATA]);
  const accountingTotal = useMemo(() => {
    return R.propOr(0, 'total')(accountingTransactionsData);
  }, [accountingDATA]);
  const accountingCount = useMemo(() => {
    return R.propOr(0, 'count')(accountingTransactionsData);
  }, [accountingDATA]);
  ////all

  const [getAllTwo, { data: expenseAllData }] = useLazyQuery(
    LIST_ALL_EXPENSES,
    {
      variables: Object.assign(
        {
          action: ACTIONS.View_Accounting,
          offset: (expensePage - 1) * 20 || 0,
          limit: 20,
        },
        period && { dateFrom: period[0] },
        period && { dateTo: period[1] },
        view && { view: view },
        expenseType && { expenseType: expenseType },
        expenseBranchId && { branchId: expenseBranchId },
        expenseSpecialtyId && { specialtyId: expenseSpecialtyId },
        expenseDoctorId && { doctorId: expenseDoctorId },
        expenseName && { expenseName: expenseName }
      ),
    }
  );
  let [getAll, { data: revenueAllData }] = useLazyQuery(LIST_ALL_REVENUES, {
    variables: Object.assign(
      {
        action: ACTIONS.View_Accounting,
        offset: (page - 1) * 20 || 0,
        limit: 20,
      },
      period && { dateFrom: period[0] },
      period && { dateTo: period[1] },
      view && { view: view },
      branchId && { branchId: branchId },
      specialtyId && { specialtyId: specialtyId },
      doctorId && { doctorId: doctorId },
      revenueName && { revenueName: revenueName }
    ),
  });

  const allRevenues = printOrNot
    ? R.propOr([], 'allRevenues')(revenueAllData)
    : [];

  const allExpenses = printOrNot
    ? R.propOr([], 'allExpenses')(expenseAllData)
    : [];

  useEffect(() => {
    if (printOrNot) {
      getAll();
      getAllTwo();
    }
  }, [getAll, getAllTwo, printOrNot]);
  useEffect(() => {
    if (refetchRe) {
      refetch();
      setRefetchRe(false);
    }
  }, [refetchRe]);
  useEffect(() => {
    if (refetchEx) {
      refetchExpenses();
      setRefetchEx(false);
    }
  }, [refetchEx]);
  return useMemo(
    () => ({
      expenses,
      revenues,
      totalExpenses,
      totalRevenues,
      RevenuesCount,
      expensesCount,
      allRevenues,
      allExpenses,
      accountingTransations,
      accountingTotal,
      accountingCount,
      refetchRevenues: {
        query: LIST_REVENUES,
      },
      refetchExpenses: {
        query: LIST_EXPENSES,
      },
    }),
    [
      expenses,
      revenues,
      allRevenues,
      allExpenses,
      totalExpenses,
      totalRevenues,
      RevenuesCount,
      expensesCount,
      accountingTransations,
      accountingTotal,
      accountingCount,
    ]
  );
};

export default useAccounting;
