import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_DENTAL_DIAGNOSIS,
  LIST_TOOTH_TRANSACTIONS,
  LIST_TOOTHS,
  LIST_ORGANIZATION_DOCTORS,
  DELETE_DENTAL_DIAGNOSIS,
  LIST_ALL_TOOTH_TRANSACTIONS,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

function useDentalDiagnosis({
  toothNumber,
  toothPartNumber,
  patientId,
  onCreate,
  onDelete,
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

  const { data: allToothData } = useQuery(LIST_ALL_TOOTH_TRANSACTIONS, {
    variables: {
      patientId: patientId,
    },
  });
  const allToothTransactions = useMemo(
    () => R.propOr([], 'myAllToothTransactions')(allToothData),
    [allToothData]
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
      {
        query: LIST_ALL_TOOTH_TRANSACTIONS,
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

  const [deleteDentalDiagnosis] = useMutation(DELETE_DENTAL_DIAGNOSIS, {
    onCompleted() {
      Alert.success('the Dental Diagnosis has been delete Successfully');
      onDelete && onDelete();
    },
    refetchQueries: [
      {
        query: LIST_ALL_TOOTH_TRANSACTIONS,
        variables: {
          patientId: patientId,
        },
      },
    ],
    onError() {
      Alert.error('Failed to delete new Dental Diagnosis');
    },
  });

  return useMemo(
    () => ({
      toothTransactions,
      allToothTransactions,
      addDentalDiagnosis,
      deleteDentalDiagnosis,
      tooths,
      doctors,
    }),
    [
      toothTransactions,
      addDentalDiagnosis,
      deleteDentalDiagnosis,
      allToothTransactions,
      tooths,
      doctors,
    ]
  );
}

export default useDentalDiagnosis;
