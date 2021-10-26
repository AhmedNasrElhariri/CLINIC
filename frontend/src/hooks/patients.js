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
  console.log(
    patientsdata,
    'patients',
    patients,
    'patientsCount',
    patientsCount
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
  const [editPatient] = useMutation(EDIT_PATIENT, {
    update(cache, { data: { editPatient: patient } }) {
      const newPatients = patients.map(p =>
        p.id === patient.id ? patient : p
      );
      updateCache(newPatients);
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
      edit: patient =>
        editPatient({
          variables: { patient },
        }),
    }),
    [
      editPatient,
      patients,
      pages,
      patientsSummary,
      searchedPatients,
      patientsReports,
    ]
  );
}

export default usePatients;
