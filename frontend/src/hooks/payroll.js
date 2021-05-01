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
  PAYSLIPS,
} from 'apollo-client/queries';
import client from 'apollo-client/client';
function usePayroll({ userId } = {}) {
  const updateTransactionsCache = userTransactions => {
    client.writeQuery({
      query: LIST_USER_TRANSACTIONS,
      variables: {
        userId,
      },
      data: {
        userTransactions,
      },
    });
  };
  const { data } = useQuery(LIST_PAY_ROLL_USERS);
  const payrollUsers = useMemo(
    () =>
      R.pipe(
        R.propOr([], 'payrollUsers'),
        R.map(u => ({ ...u, name: u.user.name }))
      )(data),
    [data]
  );
  const { data: payslipsData } = useQuery(PAYSLIPS);
  const payslips = useMemo(() => R.propOr([], 'payslips')(payslipsData), [
    payslipsData,
  ]);
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
    update(cache, { data: { addTransaction: transaction } }) {
      updateTransactionsCache([...userTransactions, transaction]);
    },
    onError() {
      Alert.error('Failed to create The Transaction');
    },
  });

  return useMemo(
    () => ({
      addPayrollUser,
      payrollUsers,
      payslips,
      addTransaction,
      userTransactions,
      addPayroll,
      deleteUser,
    }),
    [
      addPayrollUser,
      payrollUsers,
      payslips,
      addTransaction,
      userTransactions,
      addPayroll,
      deleteUser,
    ]
  );
}

export default usePayroll;
