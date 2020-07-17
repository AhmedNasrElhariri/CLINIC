import { useMemo } from 'react';
import * as R from 'ramda';
import { useQuery } from '@apollo/client';
import client from 'apollo-client/client';

import { LIST_EXPENSES, LIST_REVENUES } from 'apollo-client/queries';
import useGlobalState from 'state';

export function useVariables() {
  const [currentClinic] = useGlobalState('currentClinic');
  if (!currentClinic) {
    return {};
  }
  return {
    clinicId: currentClinic.id,
  };
}

const useFetchAccountingData = () => {
  const variables = useVariables();
  const { data: expensesData } = useQuery(LIST_EXPENSES, {
    variables,
  });
  const { data: revenueData } = useQuery(LIST_REVENUES, {
    variables,
  });

  const expenses = useMemo(() => R.propOr([], 'expenses')(expensesData), [
    expensesData,
  ]);
  const revenues = useMemo(() => R.propOr([], 'revenues')(revenueData), [
    revenueData,
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
      updateCache: expenses => {
        client.writeQuery({
          query: LIST_EXPENSES,
          variables,
          data: {
            expenses,
          },
        });
      },
    }),
    [expenses, revenues, totalExpenses, totalRevenues, variables]
  );
};

export default useFetchAccountingData;
