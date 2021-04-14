import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_PAYROLL_USER,
  LIST_PAY_ROLL_USERS,
  ADD_PAYROLL_TRANSACTION,
  LIST_USER_TRANSACTIONS,
  ADD_PAY_ROLL,
  DELETE_PAYROLL_USER,
  PAYROLL_TO_PAY_SUMMARY,
} from 'apollo-client/queries';

function usePayroll({ userId } = {}) {
  const { data } = useQuery(LIST_PAY_ROLL_USERS);
  const payrollUsers = useMemo(
    () =>
      R.pipe(
        R.propOr([], 'payrollUsers'),
        R.map(u => ({ ...u, name: u.user.name }))
      )(data),
    [data]
  );
  const { data: paySummary } = useQuery(PAYROLL_TO_PAY_SUMMARY);
  const payrollToPaySummary = useMemo(
    () => R.propOr([], 'payrollToPaySummary')(paySummary),
    [paySummary]
  );
  const { data: transactionData } = useQuery(LIST_USER_TRANSACTIONS, {
    variables: { userId },
  });
  const userTransactions = useMemo(
    () => R.propOr([], 'userTransactions')(transactionData),
    [transactionData]
  );
  const [addPayrollUser] = useMutation(ADD_PAYROLL_USER, {
    onCompleted() {
      Alert.success('the User has been Added Successfully');
    },
    refetchQueries: [{ query: LIST_PAY_ROLL_USERS }],
    onError() {
      Alert.error('Failed to add new User');
    },
  });
  const [deleteUser] = useMutation(DELETE_PAYROLL_USER, {
    onCompleted() {
      Alert.success('the User has been Deleted Successfully');
    },
    refetchQueries: [{ query: LIST_PAY_ROLL_USERS }],
    onError() {
      Alert.error('Failed to delete User');
    },
  });

  const [addPayroll] = useMutation(ADD_PAY_ROLL, {
    onCompleted() {
      Alert.success('the Payroll Payment has been Added Successfully');
    },
    onError() {
      Alert.error('Failed to create the Payroll');
    },
  });

  const [addTransaction] = useMutation(ADD_PAYROLL_TRANSACTION, {
    onCompleted() {
      Alert.success('The transaction has been created successfully');
    },
    onError() {
      Alert.error('Failed to create The Transaction');
    },
  });

  return useMemo(
    () => ({
      addPayrollUser,
      payrollUsers,
      payrollToPaySummary,
      addTransaction,
      userTransactions,
      addPayroll,
      deleteUser,
    }),
    [
      addPayrollUser,
      payrollUsers,
      payrollToPaySummary,
      addTransaction,
      userTransactions,
      addPayroll,
      deleteUser,
    ]
  );
}

export default usePayroll;
