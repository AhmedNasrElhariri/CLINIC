import { useMemo } from 'react';
import * as R from 'ramda';
import { useQuery } from '@apollo/client';
import client from 'apollo-client/client';

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
const useAccounting = ({ view, period } = {}) => {
  const { data: expensesData } = useQuery(LIST_EXPENSES);
  const { data: revenueData } = useQuery(LIST_REVENUES, {
    variables: {
      action: ACTIONS.View_Accounting,
    },
  });

  const allExpenses = useMemo(() => R.propOr([], 'expenses')(expensesData), [
    expensesData,
  ]);

  const allRevenues = useMemo(() => R.propOr([], 'revenues')(revenueData), [
    revenueData,
  ]);
  let newRevenues = [];
  allRevenues.forEach(rB => {
    rB.specialties.forEach(rS => {
      rS.doctors.forEach(rDO => {
        if (rDO.revenues.length > 0) {
          rDO.revenues.forEach(r => {
            let oneRevenue = {};
            oneRevenue = {
              branch: {
                id: rB.id,
              },
              specialty: {
                id: rS.id,
              },
              user: {
                id: rDO.id,
              },
              id: r.id,
              name: r.name,
              amount: r.amount,
              date: r.date,
            };
            newRevenues.push(oneRevenue);
          });
        }
      });
    });
  });
  const expenses = useMemo(
    () => filterAccountingList(allExpenses, view, period),
    [allExpenses, period, view]
  );

  const revenues = useMemo(
    () => filterAccountingList(newRevenues, view, period),
    [newRevenues, period, view]
  );

  const totalExpenses = useMemo(
    () => expenses.reduce((acc, e) => acc + e.amount, 0),
    [expenses]
  );

  const totalRevenues = useMemo(
    () => revenues.reduce((acc, e) => acc + e.amount, 0),
    [revenues]
  );

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
      timeFrame,
      refetchRevenues: {
        query: LIST_REVENUES,
      },
      refetchExpenses: {
        query: LIST_EXPENSES,
      },
    }),
    [expenses, revenues, timeFrame, totalExpenses, totalRevenues]
  );
};

export default useAccounting;
