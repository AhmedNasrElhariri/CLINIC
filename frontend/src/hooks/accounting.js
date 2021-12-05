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
} = {}) => {
  const { data: expensesData } = useQuery(LIST_EXPENSES);
  const { data: revenueData } = useQuery(LIST_REVENUES, {
    variables: {
      action: ACTIONS.View_Accounting,
    },
  });
  const allExpenses = useMemo(
    () => R.propOr([], 'expenses')(expensesData),
    [expensesData]
  );

  const allRevenues = useMemo(
    () => R.propOr([], 'revenues')(revenueData),
    [revenueData]
  );

  const expenses = useMemo(
    () => filterAccountingList(allExpenses, view, period),
    [allExpenses, period, view]
  );

  const revenues = useMemo(
    () => filterAccountingList(allRevenues, view, period),
    [allRevenues, period, view]
  );

  const totalExpenses = useMemo(
    () => expenses.reduce((acc, e) => acc + e.amount, 0),
    [expenses]
  );

  const totalRevenues = useMemo(
    () => revenues.reduce((acc, e) => acc + e.amount, 0),
    [revenues]
  );

  const BranchTotalExpenses = useMemo(() => {
    const updatedExpenses = expenses.filter(
      e =>
        e.branch?.id == branchId &&
        e.specialty?.id == specialtyId &&
        e.doctor?.id == userId
    );
    return updatedExpenses.reduce((acc, e) => acc + e.amount, 0);
  }, [expenses, branchId, specialtyId, userId]);

  const BranchTotalRevenues = useMemo(() => {
    const updatedRevenue = revenues.filter(
      r =>
        r.branch?.id == branchId &&
        r.specialty?.id == specialtyId &&
        r.doctor?.id == userId
    );
    return updatedRevenue.reduce((acc, e) => acc + e.amount, 0);
  }, [revenues, branchId, specialtyId, userId]);
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
      BranchTotalExpenses,
      BranchTotalRevenues,
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
      BranchTotalExpenses,
      BranchTotalRevenues,
    ]
  );
};

export default useAccounting;
