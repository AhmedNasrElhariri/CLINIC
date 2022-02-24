import { useMemo } from 'react';
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

const useAccounting = ({ view, period, onEdit, onCreate } = {}) => {
  const { data: revenueData } = useQuery(LIST_BANK_REVENUES);

  const allRevenues = useMemo(
    () => R.propOr([], 'bankRevenues')(revenueData),
    [revenueData]
  );

  const revenues = useMemo(
    () => filterAccountingList(allRevenues, view, period),
    [allRevenues, period, view]
  );
  const totalRevenues = useMemo(
    () => revenues.reduce((acc, e) => acc + e.amount, 0),
    [revenues]
  );


  const { data: expenseData } = useQuery(LIST_BANK_EXPENSES);

  const allExpenses = useMemo(
    () => R.propOr([], 'bankExpenses')(expenseData),
    [expenseData]
  );

  const expenses = useMemo(
    () => filterAccountingList(allExpenses, view, period),
    [allExpenses, period, view]
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
      timeFrame,
      editBankRevenue,
      createBankRevenue,
      createBankExpense,
      editBankExpense,
      refetchRevenues: {
        query: LIST_BANK_REVENUES,
      },
    }),
    [
      revenues,
      expenses,
      timeFrame,
      totalRevenues,
      editBankRevenue,
      createBankRevenue,
      createBankExpense,
      editBankExpense,
    ]
  );
};

export default useAccounting;
