import { useMemo } from 'react';
import * as R from 'ramda';
import { useQuery } from '@apollo/client';
import { LIST_EXPENSES, LIST_REVENUES } from 'apollo-client/queries';
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
      expenseDoctorId && { doctorId: expenseDoctorId }
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
  // const allExpenses = useMemo(
  //   () => R.propOr([], 'expenses')(expensesData),
  //   [expensesData]
  // );
  const revenuesData = revenueData?.revenues;
  const revenues = R.propOr([], 'revenues')(revenuesData);

  const expensesData = expenseData?.expenses;
  const expenses = R.propOr([], 'expenses')(expensesData);

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

  const totalRevenues = useMemo(
    () => R.propOr(0, 'totalRevenues')(revenuesData),
    [revenuesData]
  );
  const RevenuesCount = useMemo(
    () => R.propOr(0, 'revenuesCount')(revenuesData),
    [revenuesData]
  );

  const totalExpenses = useMemo(
    () => R.propOr(0, 'totalExpenses')(expensesData),
    [expensesData]
  );
  const expensesCount = useMemo(
    () => R.propOr(0, 'expensesCount')(expensesData),
    [expensesData]
  );

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

  return useMemo(
    () => ({
      expenses,
      revenues,
      totalExpenses,
      totalRevenues,
      RevenuesCount,
      expensesCount,
      // BranchTotalExpenses,
      // BranchTotalRevenues,
      timeFrame,
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
      totalExpenses,
      totalRevenues,
      RevenuesCount,
      expensesCount,
      // BranchTotalExpenses,
      // BranchTotalRevenues,
    ]
  );
};

export default useAccounting;
