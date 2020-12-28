import { useMemo } from 'react';
import * as R from 'ramda';
import { useQuery } from '@apollo/client';
import client from 'apollo-client/client';

import { LIST_EXPENSES, LIST_REVENUES } from 'apollo-client/queries';
import useGlobalState from 'state';
import { filterAccountingList } from 'utils/accounting';
import { ACCOUNTING_VIEWS } from 'utils/constants';
import {
  getDayStartAndEnd,
  getWeekStartAndEnd,
  getMonthStartAndEnd,
  getQuarterStartAndEnd,
  getYearStartAndEnd,
} from 'utils/date';

export function useVariables() {
  const [currentClinic] = useGlobalState('currentClinic');
  if (!currentClinic) {
    return {};
  }
  return {
    clinicId: currentClinic.id,
  };
}

const useFetchAccountingData = ({ view, period } = {}) => {
  const variables = useVariables();
  const { data: expensesData } = useQuery(LIST_EXPENSES, {
    variables,
  });
  const { data: revenueData } = useQuery(LIST_REVENUES, {
    variables,
  });

  const allExpenses = useMemo(() => R.propOr([], 'expenses')(expensesData), [
    expensesData,
  ]);

  const allRevenues = useMemo(() => R.propOr([], 'revenues')(revenueData), [
    revenueData,
  ]);

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
      updateExpensesCache: expenses => {
        client.writeQuery({
          query: LIST_EXPENSES,
          variables,
          data: {
            expenses,
          },
        });
      },
      updateRevenuesCache: revenues => {
        client.writeQuery({
          query: LIST_REVENUES,
          variables,
          data: {
            revenues,
          },
        });
      },
      refetchRevenues: {
        query: LIST_REVENUES,
        variables,
      },
      refetchExpenses: {
        query: LIST_EXPENSES,
        variables,
      },
    }),
    [expenses, revenues, timeFrame, totalExpenses, totalRevenues, variables]
  );
};

export default useFetchAccountingData;