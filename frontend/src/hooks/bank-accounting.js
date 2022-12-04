import { useEffect, useMemo } from 'react';
import * as R from 'ramda';
import { useMutation, useQuery } from '@apollo/client';
import { Alert } from 'rsuite';
import {
  LIST_BANK_REVENUES,
  EDIT_BANK_REVENUE,
  CREATE_BANK_REVENUE,
  CREATE_BANK_EXPENSE,
  LIST_BANK_EXPENSES,
  EDIT_BANK_EXPENSE,
} from 'apollo-client/queries';
import { filterAccountingList } from 'utils/accounting';
import { ACCOUNTING_VIEWS } from 'utils/constants';
import {
  getDayStartAndEnd,
  getWeekStartAndEnd,
  getMonthStartAndEnd,
  getQuarterStartAndEnd,
  getYearStartAndEnd,
} from 'utils/date';

const useAccounting = ({
  view,
  period,
  specialtyId,
  branchId,
  bankId,
  onEdit,
  onCreate,
  page,
  expensePage,
  doctorId,
  expenseSpecialtyId,
  expenseBranchId,
  expenseDoctorId,
  revenueName,
  accountingOption,
} = {}) => {
  const { data: revenueData } = useQuery(LIST_BANK_REVENUES, {
    variables: Object.assign(
      {
        offset: (page - 1) * 20 || 0,
        limit: 20,
      },
      period && { dateFrom: period[0] },
      period && { dateTo: period[1] },
      view && { view: view },
      branchId && { branchId: branchId },
      specialtyId && { specialtyId: specialtyId },
      doctorId && { doctorId: doctorId },
      bankId && { bankId: bankId },
      revenueName && { revenueName: revenueName }
    ),
  });

  const { data: expenseData } = useQuery(LIST_BANK_EXPENSES, {
    variables: Object.assign(
      {
        offset: (expensePage - 1) * 20 || 0,
        limit: 20,
      },
      period && { dateFrom: period[0] },
      period && { dateTo: period[1] },
      view && { view: view },
      expenseBranchId && { branchId: expenseBranchId },
      expenseSpecialtyId && { specialtyId: expenseSpecialtyId },
      expenseDoctorId && { doctorId: expenseDoctorId },
      bankId && { bankId: bankId }
    ),
  });

  const revenuesData = revenueData?.bankRevenues;
  console.log(revenueData,'revenueData');
  const revenues = useMemo(() => {
    return R.propOr([], 'bankRevenues')(revenuesData);
  }, [revenueData]);

  const expensesData = expenseData?.bankExpenses;
  const expenses = useMemo(() => {
    return accountingOption === 'Revenue'
      ? []
      : R.propOr([], 'bankExpenses')(expensesData);
  }, [expensesData, accountingOption]);

 
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

  const totalRevenues = useMemo(() => {
    return accountingOption === 'Expense'
      ? 0
      : R.propOr(0, 'totalRevenues')(revenuesData);
  }, [revenueData, accountingOption]);
  const RevenuesCount = useMemo(() => {
    return accountingOption === 'Expense'
      ? 0
      : R.propOr(0, 'revenuesCount')(revenuesData);
  }, [revenueData, accountingOption]);

  const totalExpenses = useMemo(() => {
    return accountingOption === 'Revenue'
      ? 0
      : R.propOr(0, 'totalExpenses')(expensesData);
  }, [expensesData, accountingOption]);
  const expensesCount = useMemo(() => {
    return accountingOption === 'Revenue'
      ? 0
      : R.propOr(0, 'expensesCount')(expensesData);
  }, [expensesData, accountingOption]);

  const [editBankRevenue] = useMutation(EDIT_BANK_REVENUE, {
    onCompleted() {
      Alert.success('the Bank Transition has been Edited Successfully');
      onEdit && onEdit();
    },
    refetchQueries: [
      {
        query: LIST_BANK_REVENUES,
      },
    ],
    onError() {
      Alert.error('Failed to edit the Bank Transition');
    },
  });
  const [editBankExpense] = useMutation(EDIT_BANK_EXPENSE, {
    onCompleted() {
      Alert.success('the Bank Transition has been Edited Successfully');
      onEdit && onEdit();
    },
    refetchQueries: [
      {
        query: LIST_BANK_EXPENSES,
      },
    ],
    onError() {
      Alert.error('Failed to edit the Bank Transition');
    },
  });
  const [createBankRevenue] = useMutation(CREATE_BANK_REVENUE, {
    onCompleted() {
      Alert.success('the Bank Transition has been Created Successfully');
      onCreate && onCreate();
    },
    refetchQueries: [
      {
        query: LIST_BANK_REVENUES,
      },    
    ],
    onError() {
      Alert.error('Failed to Create the Bank Transition');
    },
  });
  const [createBankExpense] = useMutation(CREATE_BANK_EXPENSE, {
    onCompleted() {
      Alert.success('the Bank Transition has been Created Successfully');
      onCreate && onCreate();
    },
    refetchQueries: [
      {
        query: LIST_BANK_EXPENSES,
      },
    ],
    onError() {
      Alert.error('Failed to Create the Bank Transition');
    },
  });

  return useMemo(
    () => ({
      revenues,
      expenses,
      totalRevenues,
      RevenuesCount,
      totalExpenses,
      expensesCount,
      timeFrame,
      editBankRevenue,
      createBankRevenue,
      createBankExpense,
      editBankExpense,
      // refetchRevenues: {
      //   query: LIST_BANK_REVENUES,
      // },
    }),
    [
      revenues,
      expenses,
      timeFrame,
      totalRevenues,
      RevenuesCount,
      totalExpenses,
      expensesCount,
      editBankRevenue,
      createBankRevenue,
      createBankExpense,
      editBankExpense,
    ]
  );
};

export default useAccounting;
