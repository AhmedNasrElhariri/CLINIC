import { useMemo } from 'react';
import * as R from 'ramda';
import { useQuery, useMutation } from '@apollo/client';
import {
  LIST_INSURANCE_TRANSACTIONS,
  GATHER_INSURANCE,
  REVERT_INSURANCE
} from 'apollo-client/queries';
import { ACCOUNTING_VIEWS } from 'utils/constants';
import {
  getDayStartAndEnd,
  getWeekStartAndEnd,
  getMonthStartAndEnd,
  getQuarterStartAndEnd,
  getYearStartAndEnd,
} from 'utils/date';
import { Alert } from 'rsuite';

const useAccounting = ({
  view,
  period,
  specialtyId,
  branchId,
  page,
  doctorId,
  companyId,
  status,
} = {}) => {
  const { data: insuranceData } = useQuery(LIST_INSURANCE_TRANSACTIONS, {
    variables: Object.assign(
      {
        offset: (page - 1) * 20 || 0,
        limit: 20,
      },
      period && { dateFrom: period[0] },
      period && { dateTo: period[1] },
      view && { view },
      branchId && { branchId },
      specialtyId && { specialtyId },
      doctorId && { doctorId },
      companyId && { companyId },
      status && { status }
    ),
  });

  const insurancesData = insuranceData?.insuranceTransactions;
  const insuranceTransactions = R.propOr(
    [],
    'insuranceTransactions'
  )(insurancesData);
  const totalInsuranceDebit = useMemo(
    () => R.propOr(0, 'totalInsuranceDebit')(insurancesData),
    [insurancesData]
  );
  const InsuranceDebitCount = useMemo(
    () => R.propOr(0, 'InsuranceDebitCount')(insurancesData),
    [insurancesData]
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
  const [gatherInsurance] = useMutation(GATHER_INSURANCE, {
    onCompleted() {
      Alert.success('The fees has been gathered Successfully');
    },
    refetchQueries: [
      {
        query: LIST_INSURANCE_TRANSACTIONS,
        variables: Object.assign(
          {
            offset: (page - 1) * 20 || 0,
            limit: 20,
          },
          period && { dateFrom: period[0] },
          period && { dateTo: period[1] },
          view && { view },
          branchId && { branchId },
          specialtyId && { specialtyId },
          doctorId && { doctorId },
          companyId && { companyId },
          status && { status }
        ),
      },
    ],
    onError(err) {
      Alert.error(err.message);
    },
  });
  const [revertInsurance] = useMutation(REVERT_INSURANCE, {
    onCompleted() {
      Alert.success('The fees has been reverted Successfully');
    },
    refetchQueries: [
      {
        query: LIST_INSURANCE_TRANSACTIONS,
        variables: Object.assign(
          {
            offset: (page - 1) * 20 || 0,
            limit: 20,
          },
          period && { dateFrom: period[0] },
          period && { dateTo: period[1] },
          view && { view },
          branchId && { branchId },
          specialtyId && { specialtyId },
          doctorId && { doctorId },
          companyId && { companyId },
          status && { status }
        ),
      },
    ],
    onError(err) {
      Alert.error(err.message);
    },
  });
  return useMemo(
    () => ({
      insuranceTransactions,
      totalInsuranceDebit,
      InsuranceDebitCount,
      timeFrame,
      refetchRevenues: {
        query: LIST_INSURANCE_TRANSACTIONS,
      },
      gatherInsurance,
      revertInsurance
    }),
    [
      insuranceTransactions,
      InsuranceDebitCount,
      timeFrame,
      totalInsuranceDebit,
      gatherInsurance,
      revertInsurance
    ]
  );
};

export default useAccounting;
