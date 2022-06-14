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
  LIST_USERS,
  DELETE_PAYROLL_USER,
  PAYSLIPS,
  TRANSCTION_COURSES_TIMEFRAME,
  TRANSCTION_REVENUES_TIMEFRAME,
  USER_COURSE_PAYMENT,
  EDIT_PAYROLL_TRANSACTION,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

function usePayroll({
  userId,
  period,
  doctorId,
  specialtyId,
  branchId,
  onCreate,
  onEdit,
} = {}) {
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
        R.map(u => ({ ...u, name: u.name }))
      )(data),
    [data]
  );
  const { data: OrgUsers } = useQuery(LIST_USERS);
  const organizationusers = useMemo(
    () => R.propOr([], 'listUsers')(OrgUsers),
    [OrgUsers]
  );
  const { data: payslipsData } = useQuery(PAYSLIPS);
  const payslips = useMemo(
    () => R.propOr([], 'payslips')(payslipsData),
    [payslipsData]
  );
  const { data: transactionData } = useQuery(LIST_USER_TRANSACTIONS, {
    variables: { userId },
  });
  const { data: coursePaymentData } = useQuery(USER_COURSE_PAYMENT, {
    variables: { userId, period, doctorId, specialtyId, branchId },
  });
  const userCoursesPayment = useMemo(
    () => R.propOr([], 'userCoursePayment')(coursePaymentData),
    [coursePaymentData, period, userId, doctorId, specialtyId, branchId]
  );
  const { data: transctionCoursesTimeFrame } = useQuery(
    TRANSCTION_COURSES_TIMEFRAME,
    {
      variables: { userId },
    }
  );
  const lastTransactionDate = useMemo(
    () =>
      R.propOr({}, 'transactionCoursesTimeFrame')(transctionCoursesTimeFrame),
    [transctionCoursesTimeFrame]
  );

  const { data: transctionRevenuesTimeFrame } = useQuery(
    TRANSCTION_REVENUES_TIMEFRAME,
    {
      variables: { userId },
    }
  );
  const lastTransactionRevenueDate = useMemo(
    () =>
      R.propOr({}, 'transactionRevenuesTimeFrame')(transctionRevenuesTimeFrame),
    [transctionRevenuesTimeFrame]
  );

  const userTransactions = useMemo(
    () => R.propOr([], 'userTransactions')(transactionData),
    [transactionData]
  );
  const [addPayrollUser, { loading: addUserLoading }] = useMutation(
    ADD_PAYROLL_USER,
    {
      onCompleted() {
        Alert.success('the User has been Added Successfully');
        onCreate && onCreate();
      },
      refetchQueries: [{ query: LIST_PAY_ROLL_USERS }],
      onError() {
        Alert.error('Failed to add new User');
      },
    }
  );
  const [deleteUser, { loading: deleteUserLoading }] = useMutation(
    DELETE_PAYROLL_USER,
    {
      onCompleted() {
        Alert.success('the User has been Deleted Successfully');
      },
      refetchQueries: [{ query: LIST_PAY_ROLL_USERS }],
      onError() {
        Alert.error('Failed to delete User');
      },
    }
  );

  const [addPayroll, { loading: addPayrollLoading }] = useMutation(
    ADD_PAY_ROLL,
    {
      onCompleted() {
        Alert.success('the Payroll Payment has been Added Successfully');
      },
      onError() {
        Alert.error('Failed to create the Payroll');
      },
    }
  );

  const [addTransaction, { loading: addTransactionLoading }] = useMutation(
    ADD_PAYROLL_TRANSACTION,
    {
      onCompleted() {
        Alert.success('The transaction has been created successfully');
      },
      update(cache, { data: { addTransaction: transaction } }) {
        updateTransactionsCache([...userTransactions, transaction]);
      },
      onError() {
        Alert.error('Failed to create The Transaction');
      },
    }
  );
  const [editPayrollTransaction] = useMutation(EDIT_PAYROLL_TRANSACTION, {
    onCompleted() {
      Alert.success('The transaction has been Edit successfully');
      onEdit && onEdit();
    },
    update(cache, { data: { editPayrollTransaction: transaction } }) {
      const newTransactions = userTransactions.map(t => {
        if (t.id === transaction.id) {
          return transaction;
        } else {
          return t;
        }
      });
      updateTransactionsCache(newTransactions);
    },
    onError() {
      Alert.error('Failed to edit The Transaction');
    },
  });

  return useMemo(
    () => ({
      addPayrollUser,
      payrollUsers,
      payslips,
      addTransaction,
      organizationusers,
      userTransactions,
      userCoursesPayment,
      lastTransactionDate,
      lastTransactionRevenueDate,
      addPayroll,
      deleteUser,
      addUserLoading,
      deleteUserLoading,
      editPayrollTransaction,
      addTransactionLoading,
      addPayrollLoading,
    }),
    [
      addPayrollUser,
      payrollUsers,
      payslips,
      addTransaction,
      userTransactions,
      organizationusers,
      userCoursesPayment,
      lastTransactionDate,
      lastTransactionRevenueDate,
      addPayroll,
      deleteUser,
      addUserLoading,
      deleteUserLoading,
      editPayrollTransaction,
      addTransactionLoading,
      addPayrollLoading,
    ]
  );
}

export default usePayroll;
