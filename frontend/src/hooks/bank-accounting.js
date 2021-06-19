import { useMemo } from 'react';
import * as R from 'ramda';
import { useQuery } from '@apollo/client';
import client from 'apollo-client/client';

import { LIST_BANK_REVENUES } from 'apollo-client/queries';
import { filterAccountingList } from 'utils/accounting';
import { ACCOUNTING_VIEWS } from 'utils/constants';
import {
  getDayStartAndEnd,
  getWeekStartAndEnd,
  getMonthStartAndEnd,
  getQuarterStartAndEnd,
  getYearStartAndEnd,
} from 'utils/date';
import { ACTIONS } from 'utils/constants';
const useAccounting = ({ view, period } = {}) => {
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

  return useMemo(
    () => ({
      revenues,
      totalRevenues,
      timeFrame,
      refetchRevenues: {
        query: LIST_BANK_REVENUES,
      },
    }),
    [revenues, timeFrame, totalRevenues]
  );
};

export default useAccounting;