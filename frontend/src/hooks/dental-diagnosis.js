import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_DENTAL_DIAGNOSIS,
  LIST_TOOTH_TRANSACTIONS,
  LIST_TOOTHS,
  LIST_ORGANIZATION_DOCTORS
} from 'apollo-client/queries';
import client from 'apollo-client/client';

function useDentalDiagnosis({
  toothNumber,
  toothPartNumber,
  patientId,
  onCreate,
  onEdit,
} = {}) {
  const { data } = useQuery(LIST_TOOTH_TRANSACTIONS, {
    variables: {
      toothNumber: toothNumber,
      toothPartNumber: toothPartNumber,
      patientId: patientId,
    },
  });
  const toothTransactions = useMemo(
    () => R.propOr([], 'myToothTransactions')(data),
    [data]
  );

  const { data: toothsData } = useQuery(LIST_TOOTHS, {
    variables: {
      patientId: patientId,
    },
  });
  const tooths = useMemo(
    () => R.propOr([], 'myTooths')(toothsData),
    [toothsData]
  );

  const { data: doctorsData } = useQuery(LIST_ORGANIZATION_DOCTORS);
  const doctors = useMemo(
    () => R.propOr([], 'listOrganizationDoctors')(doctorsData),
    [doctorsData]
  );

  const [addDentalDiagnosis] = useMutation(ADD_DENTAL_DIAGNOSIS, {
    onCompleted() {
      Alert.success('the Dental Diagnosis has been Added Successfully');
      onCreate && onCreate();
    },
    refetchQueries: [
      {
        query: LIST_TOOTHS,
        variables: {
          patientId: patientId,
        },
      },
    ],
    // update(cache, { data: { addDentalDiagnosis: dentalDiagnosis} }) {
    //   updateCache([...dentalDiagnosiss, dentalDiagnosis]);
    // },
    onError() {
      Alert.error('Failed to add new Dental Diagnosis');
    },
  });

  return useMemo(
    () => ({
      toothTransactions,
      addDentalDiagnosis,
      tooths,
      doctors
    }),
    [toothTransactions, addDentalDiagnosis, tooths,doctors]
  );
}

export default useDentalDiagnosis;
