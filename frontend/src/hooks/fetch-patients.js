import { useMemo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import { LIST_PATIENTS, EDIT_PATIENT } from 'apollo-client/queries';
import useGlobalState from 'state';
import client from 'apollo-client/client';

const updateCache = patients => {
  client.writeQuery({
    query: LIST_PATIENTS,
    data: {
      patients,
    },
  });
};

export function useVariables() {
  const [currentClinic] = useGlobalState('currentClinic');
  if (!currentClinic) {
    return {};
  }
  return {
    input: {
      clinicIds: [currentClinic.id],
    },
  };
}

function useFetchPatients({ onEdit } = {}) {
  const { data } = useQuery(LIST_PATIENTS, {
    variables: {},
  });
  const patients = useMemo(() => R.propOr([], 'patients')(data), [data]);

  const [editPatient] = useMutation(EDIT_PATIENT, {
    update(cache, { data: { editPatient: patient } }) {
      const newPatients = patients.map(p =>
        p.id === patient.id ? patient : p
      );
      console.log(newPatients);
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

export default useFetchPatients;
