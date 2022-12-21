import { useMemo } from 'react';
import * as R from 'ramda';
import { useQuery } from '@apollo/client';
import { LIST_COMPANY_REVENUES } from 'apollo-client/queries';
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
  page,
  doctorId,
  companyId,
} = {}) => {
  const { data: revenueData } = useQuery(LIST_COMPANY_REVENUES, {
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
      companyId && { companyId: companyId }
    ),
  });

  const revenuesData = revenueData?.companyRevenues;
  const revenues = R.propOr([], 'companyRevenues')(revenuesData);
  const totalRevenues = useMemo(
    () => R.propOr(0, 'totalRevenues')(revenuesData),
    [revenuesData]
  );
  const RevenuesCount = useMemo(
    () => R.propOr(0, 'revenuesCount')(revenuesData),
    [revenuesData]
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
      RevenuesCount,
      timeFrame,
      refetchRevenues: {
        query: LIST_COMPANY_REVENUES,
      },
    }),
    [revenues, RevenuesCount, timeFrame, totalRevenues]
  );
};

export default useAccounting;
