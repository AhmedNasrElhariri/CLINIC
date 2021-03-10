import { useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import { LIST_PATIENTS, EDIT_PATIENT } from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = patients => {
  client.writeQuery({
    query: LIST_PATIENTS,
    data: {
      patients,
    },
  });
};

function usePatients({ onEdit } = {}) {
  const { data } = useQuery(LIST_PATIENTS, {
    variables: {},
  });
  const patients = useMemo(() => R.propOr([], 'patients')(data), [data]);

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
      // onCreate(patient);
      // setFormValue(initialValues);
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
      edit: patient =>
        editPatient({
          variables: { patient },
        }),
    }),
    [editPatient, patients]
  );
}

export default usePatients;
