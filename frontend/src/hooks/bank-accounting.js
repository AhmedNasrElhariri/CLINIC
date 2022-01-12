import { useMemo } from 'react';
import * as R from 'ramda';
import { useMutation, useQuery } from '@apollo/client';
import { Alert } from 'rsuite';
import {
  LIST_BANK_REVENUES,
  EDIT_BANK_TRANSITION,
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

const useAccounting = ({ view, period,onEdit } = {}) => {
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

  const [editBankTransition] = useMutation(EDIT_BANK_TRANSITION, {
    onCompleted() {
      Alert.success('the Bank Transition has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the Bank Transition');
    },
  });

  return useMemo(
    () => ({
      revenues,
      totalRevenues,
      timeFrame,
      editBankTransition,
      refetchRevenues: {
        query: LIST_BANK_REVENUES,
      },
    }),
    [revenues, timeFrame, totalRevenues, editBankTransition]
  );
};

export default useAccounting;
