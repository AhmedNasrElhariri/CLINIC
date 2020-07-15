import { useMemo } from 'react';
import * as R from 'ramda';
import { useQuery } from '@apollo/react-hooks';

import { LIST_EXPENSES, LIST_REVENUES } from 'apollo-client/queries';
import useGlobalState from 'state';

const AccountingContainer = () => {
  const [clinic] = useGlobalState('currentClinic');
  const { data: expensesData } = useQuery(LIST_EXPENSES, {
    variables: {
      clinicId: clinic.id,
    },
  });
  const { data: revenueData } = useQuery(LIST_REVENUES, {
    variables: {
      clinicId: clinic.id,
    },
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

  return {
    expenses,
    revenues,
    totalExpenses,
    totalRevenues,
  };
};

AccountingContainer.propTypes = {};

export default AccountingContainer;
