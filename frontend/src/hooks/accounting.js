import { useMemo, useEffect } from 'react';
import * as R from 'ramda';
import { useQuery, useLazyQuery } from '@apollo/client';
import {
  LIST_EXPENSES,
  LIST_REVENUES,
  LIST_ALL_EXPENSES,
  LIST_ALL_REVENUES,
} from 'apollo-client/queries';
import { filterAccountingList } from 'utils/accounting';
import { ACCOUNTING_VIEWS } from 'utils/constants';
import {
  getDayStartAndEnd,
  getWeekStartAndEnd,
  getMonthStartAndEnd,
  getQuarterStartAndEnd,
  getYearStartAndEnd,
} from 'utils/date';
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
} = {}) => {
  const { data: expenseData, refetch: refetchExpenses } = useQuery(LIST_EXPENSES, {
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
  });
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
      revenueName && { revenueName: revenueName }
    ),
  });
  console.log(revenueData, 'revenueData');
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
  }, [revenueData, accountingOption]);
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

  const getTimeFrameByView = view => {
    const viewVsFn = {
      [ACCOUNTING_VIEWS.DAY]: getDayStartAndEnd,
      [ACCOUNTING_VIEWS.WEEK]: getWeekStartAndEnd,
      [ACCOUNTING_VIEWS.MONTH]: getMonthStartAndEnd,
      [ACCOUNTING_VIEWS.QUARTER]: getQuarterStartAndEnd,
      [ACCOUNTING_VIEWS.YEAR]: getYearStartAndEnd,
    };

    if (viewVsFn[view]) {
      return viewVsFn[view]();
    }
  };
  const timeFrame = useMemo(
    () => (period && period.length ? period : getTimeFrameByView(view)),
    [period, view]
  );
  useEffect(() => {
    if (printOrNot) {
      getAll();
      getAllTwo();
    }
  }, [getAll, getAllTwo, printOrNot]);
  useEffect(() => {
    refetch();
    setRefetchRe(false);
  }, [refetchRe]);
  useEffect(() => {
    refetchExpenses();
    setRefetchEx(false);
  }, [refetchEx]);
  return useMemo(
    () => ({
      expenses,
      revenues,
      totalExpenses,
      totalRevenues,
      RevenuesCount,
      expensesCount,
      timeFrame,
      allRevenues,
      allExpenses,
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
      timeFrame,
      allRevenues,
      allExpenses,
      totalExpenses,
      totalRevenues,
      RevenuesCount,
      expensesCount,
    ]
  );
};

export default useAccounting;
