import { useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  LIST_PATIENTS,
  EDIT_PATIENT,
  LIST_PATIENTS_SUMMARY,
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

function usePatients({ onEdit, page, name, phoneNo } = {}) {
  const { data, fetchMore } = useQuery(LIST_PATIENTS, {
    variables: {
      offset: (page - 1) * 20,
      limit: 20,
      name,
      phoneNo,
    },
  });
  const patientsdata = data?.patients;
  const patients = useMemo(
    () => R.propOr([], 'patients')(patientsdata),
    [data]
  );
  const patientsCount = useMemo(
    () => R.propOr(0, 'patientsCount')(patientsdata),
    [data]
  );
  const pages = Math.ceil(patientsCount / 20);

  const { data: patientSummaryData } = useQuery(LIST_PATIENTS_SUMMARY, {});
  const patientsSummarydata = patientSummaryData?.patients;
  const patientsSummary = useMemo(
    () => R.propOr([], 'patients')(patientsSummarydata),
    [patientSummaryData]
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
      patientsSummary,
      pages,
      edit: patient =>
        editPatient({
          variables: { patient },
        }),
    }),
    [editPatient, patients, pages, patientsSummary]
  );
}

export default usePatients;
