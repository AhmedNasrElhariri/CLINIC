import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_PATIENT_REPORT,
  EDIT_PATIENT_REPORT,
  LIST_PATIENT_REPORTS,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myPatientReports => {
  client.writeQuery({
    query: LIST_PATIENT_REPORTS,
    data: {
      myPatientReports,
    },
  });
};

function usePatientReports({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_PATIENT_REPORTS);
  const patientReports = useMemo(
    () => R.propOr([], 'myPatientReports')(data),
    [data]
  );

  const [addPatientReport, { loading }] = useMutation(ADD_PATIENT_REPORT, {
    onCompleted() {
      Alert.success('the Patient Report has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addPatientReport: patientReport } }) {
      updateCache([...patientReports, patientReport]);
    },
    onError() {
      Alert.error('Failed to add new Patient Report');
    },
  });
  const [editPatientReport] = useMutation(EDIT_PATIENT_REPORT, {
    onCompleted() {
      Alert.success('the Patient Report has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the Patient Report');
    },
  });

  return useMemo(
    () => ({
      patientReports,
      addPatientReport,
      editPatientReport,
      updateCache,
      loading,
    }),
    [patientReports, addPatientReport, editPatientReport, loading]
  );
}

export default usePatientReports;
