import { useMemo } from 'react';
import * as R from 'ramda';
import { useQuery } from '@apollo/client';
import client from 'apollo-client/client';

import { LIST_EXPENSES, LIST_REVENUES } from 'apollo-client/queries';
import useGlobalState from 'state';
import { filterAccountingList } from 'utils/accounting';

export function useVariables() {
  const [currentClinic] = useGlobalState('currentClinic');
  if (!currentClinic) {
    return {};
  }
  return {
    clinicId: currentClinic.id,
  };
}

const useFetchAccountingData = view => {
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

  const expenses = useMemo(() => filterAccountingList(allExpenses, view), [
    allExpenses,
    view,
  ]);

  const revenues = useMemo(() => filterAccountingList(allRevenues, view), [
    allRevenues,
    view,
  ]);

  const totalExpenses = useMemo(
    () => expenses.reduce((acc, e) => acc + e.amount, 0),
    [expenses]
  );

  const totalRevenues = useMemo(
    () => revenues.reduce((acc, e) => acc + e.amount, 0),
    [revenues]
  );

  return useMemo(
    () => ({
      expenses,
      revenues,
      totalExpenses,
      totalRevenues,
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
      refetchRevenues: () => ({
        query: LIST_REVENUES,
        variables,
      }),
    }),
    [expenses, revenues, totalExpenses, totalRevenues, variables]
  );
};

export default useFetchAccountingData;
