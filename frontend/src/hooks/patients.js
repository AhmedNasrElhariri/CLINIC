import { useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  LIST_PATIENTS,
  LIST_SEARCHED_PATIENTS,
  EDIT_PATIENT,
  LIST_PATIENTS_SUMMARY,
  LIST_PATIENTS_REPORT,
  GET_PATIENT,
  PATIENT_COUPONS,
  LIST_ALL_PATIENTS,
  COUPON_POINTS_TRANSACTIONS,
  PATIENT_REVENUE,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = patients => {
  client.writeQuery({
    query: LIST_PATIENTS,
    data: {
      patients,
    },
  });
};

function usePatients({
  onEdit,
  page = 1,
  name = '',
  phoneNo = '',
  area,
  reference,
  patientSearchValue,
  patientId,
  all = false,
  couponId,
} = {}) {
  const { data: patientData } = useQuery(LIST_PATIENTS, {
    variables: {
      offset: (page - 1) * 20 || 0,
      limit: 20,
      name,
      phoneNo,
    },
  });
  const patientsdata = patientData?.patients;
  const patients = useMemo(
    () => R.propOr([], 'patients')(patientsdata),
    [patientData]
  );
  const patientsCount = useMemo(
    () => R.propOr(0, 'patientsCount')(patientsdata),
    [patientData]
  );

  const pages = Math.ceil(patientsCount / 20);

  const { data: patientSummaryData } = useQuery(LIST_PATIENTS_SUMMARY, {});
  const patientsSummarydata = patientSummaryData?.patients;
  const patientsSummary = useMemo(
    () => R.propOr([], 'patients')(patientsSummarydata),
    [patientSummaryData]
  );

  const { data: searchedPatientsData } = useQuery(LIST_SEARCHED_PATIENTS, {
    variables: {
      name: patientSearchValue,
    },
  });
  const searchedPatients = useMemo(
    () => R.propOr([], 'searchedPatients')(searchedPatientsData),
    [searchedPatientsData]
  );

  const { data: allPatientsData } = useQuery(LIST_ALL_PATIENTS);
  const allPatients = useMemo(
    () => R.propOr([], 'allPatients')(allPatientsData),
    [allPatientsData]
  );

  const { data: onePatientData } = useQuery(GET_PATIENT, {
    variables: {
      id: patientId,
    },
  });
  const onePatient = R.propOr({}, 'patient')(onePatientData);

  const { data: patientCouponData } = useQuery(PATIENT_COUPONS, {
    variables: {
      patientId: patientId,
      all: all,
    },
  });
  const patientCoupons = R.propOr([], 'patientCoupons')(patientCouponData);


  const { data: couponTransactionsData } = useQuery(
    COUPON_POINTS_TRANSACTIONS,
    {
      variables: {
        couponId: couponId,
      },
    }
  );
  const couponPointsTransactions = R.propOr(
    [],
    'couponPointsTransactions'
  )(couponTransactionsData);

  const { data: patientRevenueData } = useQuery(PATIENT_REVENUE, {
    variables: {
      patientId: patientId,
    },
  });
  const patientRevenue= R.propOr([], 'patientRevenue')(patientRevenueData);

  const [editPatient] = useMutation(EDIT_PATIENT, {
    update(cache, { data: { editPatient: patient } }) {
      const newPatients = patients.map(p =>
        p.id === patient.id ? patient : p
      );
      // updateCache(newPatients);
      onEdit && onEdit();
    },
    onCompleted: ({ createPatient: patient }) => {
      Alert.success('Patient Created Successfully');
    },
    onError: () => Alert.error('Invalid Input'),
  });

  const { data: patientsReportData } = useQuery(LIST_PATIENTS_REPORT, {
    variables: {
      area,
      reference,
    },
  });
  const patientsReports = useMemo(
    () => R.propOr({}, 'patientsReport')(patientsReportData),
    [patientsReportData]
  );

  return useMemo(
    () => ({
      patients,
      updateCache: patients => {
        client.writeQuery({
          query: LIST_PATIENTS,
          data: {
            patients,
          },
        });
      },
      searchedPatients,
      patientsSummary,
      patientsReports,
      pages,
      onePatient,
      patientCoupons,
      allPatients,
      couponPointsTransactions,
      patientRevenue,
      edit: patient =>
        editPatient({
          variables: { patient },
        }),
    }),
    [
      editPatient,
      patients,
      pages,
      onePatient,
      patientsSummary,
      searchedPatients,
      patientsReports,
      patientCoupons,
      allPatients,
      couponPointsTransactions,
      patientRevenue,
    ]
  );
}

export default usePatients;
