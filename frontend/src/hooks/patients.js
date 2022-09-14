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
  CREATE_PATIENT,
  LIST_PATIENTS_REPORTS,
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
  patientSearchValue,
  patientLevel,
  patientId,
  all = false,
  couponId,
  onCreate,
  age,
  session,
  type,
  period,
  reference,
} = {}) {
  const { data: patientData } = useQuery(LIST_PATIENTS, {
    variables: Object.assign(
      {
        offset: (page - 1) * 20 || 0,
        limit: 20,
      },
      name && { name: name },
      phoneNo && { phoneNo: phoneNo }
    ),
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

  ////
  const { data: patientReportsData } = useQuery(LIST_PATIENTS_REPORTS, {
    variables: Object.assign(
      {
        offset: (page - 1) * 20 || 0,
        limit: 20,
      },
      area && { area: area },
      patientLevel && { patientLevel: patientLevel },
      type && { type: type },
      age && { ageFrom: age[0] },
      age && { ageTo: age[1] },
      period && { dateFrom: period[0] },
      period && { dateTo: period[1] },
      reference && { reference: reference }
    ),
  });
  const patientsReportsdata = patientReportsData?.patientsReports;
  const ReportsPatients = useMemo(
    () => R.propOr([], 'patients')(patientsReportsdata),
    [patientsReportsdata]
  );
  const reportsPatientsCount = useMemo(
    () => R.propOr(0, 'patientsCount')(patientsReportsdata),
    [patientsReportsdata]
  );
  const reportsPages = Math.ceil(reportsPatientsCount / 20);

  //

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
      offset: (page - 1) * 20 || 0,
      limit: 20,
    },
  });
  const patientRevenuesData = patientRevenueData?.patientRevenue;
  const patientRevenue = R.propOr([], 'patientRevenue')(patientRevenuesData);
  const patientTotalRevenue = R.propOr(0, 'totalRevenue')(patientRevenuesData);
  const patientRevenueCounts = R.propOr(
    0,
    'patientRevenueCounts'
  )(patientRevenuesData);

  const [createPatient, { loading }] = useMutation(CREATE_PATIENT, {
    onCompleted: ({ createPatient: patient }) => {
      Alert.success('Patient Created Successfully');
      onCreate && onCreate();
    },
    refetchQueries: [
      {
        query: LIST_PATIENTS,
        variables: {
          offset: 0,
          limit: 20,
          name: '',
          phoneNo: '',
          phoneNoTwo: '',
        },
      },
      {
        query: LIST_SEARCHED_PATIENTS,
        variables: {
          name: '',
        },
      },
    ],
    onError: () => Alert.error('Invalid Input'),
  });

  const [editPatient] = useMutation(EDIT_PATIENT, {
    onCompleted: ({ createPatient: patient }) => {
      Alert.success('Patient updated Successfully');
    },
    update(cache, { data: { editPatient: patient } }) {
      const newPatients = patients.map(p =>
        p.id === patient.id ? patient : p
      );
      updateCache(newPatients);
      onEdit && onEdit();
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
      patientRevenueCounts,
      patientTotalRevenue,
      createPatient,
      ReportsPatients,
      reportsPages,
      reportsPatientsCount,
      createPatientLoading: loading,
      edit: patient =>
        editPatient({
          variables: { patient },
        }),
    }),
    [
      editPatient,
      createPatient,
      patients,
      pages,
      loading,
      onePatient,
      patientsSummary,
      searchedPatients,
      patientsReports,
      patientCoupons,
      allPatients,
      couponPointsTransactions,
      patientRevenue,
      patientRevenueCounts,
      patientTotalRevenue,
      ReportsPatients,
      reportsPages,
      reportsPatientsCount,
    ]
  );
}

export default usePatients;
