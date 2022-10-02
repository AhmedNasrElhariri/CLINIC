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
} = {}) => {
  const { data: expenseData } = useQuery(LIST_EXPENSES, {
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
  const { data: revenueData } = useQuery(LIST_REVENUES, {
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
  const revenuesData = revenueData?.revenues;
  const revenues =
    accountingOption === 'Expense'
      ? []
      : R.propOr([], 'revenues')(revenuesData);

  const expensesData = expenseData?.expenses;
  const expenses =
    accountingOption === 'Revenue'
      ? []
      : R.propOr([], 'expenses')(expensesData);

  // const expenses = useMemo(
  //   () => filterAccountingList(allExpenses, view, period),
  //   [allExpenses, period, view]
  // );
  // const revenues = useMemo(
  //   () => filterAccountingList(allRevenues, view, period),
  //   [allRevenues, period, view]
  // );

  // const totalExpenses = useMemo(
  //   () => expenses.reduce((acc, e) => acc + e.amount, 0),
  //   [expenses]
  // );

  // const totalRevenues = useMemo(
  //   () => revenues.reduce((acc, e) => acc + e.amount, 0),
  //   [revenues]
  // );

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
console.log(allRevenues,'allRevenues');
  // const BranchTotalExpenses = useMemo(() => {
  //   const updatedExpenses = expenses.filter(
  //     e =>
  //       e.branch?.id == branchId &&
  //       e.specialty?.id == specialtyId &&
  //       e.doctor?.id == userId
  //   );
  //   return updatedExpenses.reduce((acc, e) => acc + e.amount, 0);
  // }, [expenses, branchId, specialtyId, userId]);

  // const BranchTotalRevenues = useMemo(() => {
  //   const updatedRevenue = revenues?.filter(
  //     r =>
  //       r.branch?.id == branchId &&
  //       r.specialty?.id == specialtyId &&
  //       r.doctor?.id == userId
  //   );
  //   return updatedRevenue.reduce((acc, e) => acc + e.amount, 0);
  // }, [revenues, branchId, specialtyId, userId]);

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
  }, [getAll,getAllTwo, printOrNot]);

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
