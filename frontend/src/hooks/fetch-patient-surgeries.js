import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import client from 'apollo-client/client';
import {
  CREATE_PATIENT_SURGERY,
  LIST_PATIENT_SURGERIES,
} from 'apollo-client/queries/surgery';
import { CREATE_APPOINTMENT } from 'apollo-client/queries';
import { APPT_TYPE } from 'utils/constants';
import useGlobalState from 'state';
import { useHistory } from 'react-router-dom';

const updateCache = myPatientSurgeries => {
  client.writeQuery({
    query: LIST_PATIENT_SURGERIES,
    data: {
      myPatientSurgeries,
    },
  });
};

const usePatientSurgeries = ({ onCreate } = {}) => {
  const history = useHistory();
  const { data } = useQuery(LIST_PATIENT_SURGERIES);
  const [clinic] = useGlobalState('currentClinic');
  const patientSurgeries = useMemo(
    () => R.propOr([], 'myPatientSurgeries')(data),
    [data]
  );

  const [createAppointment] = useMutation(CREATE_APPOINTMENT, {
    onCompleted: ({ createAppointment }) => {
      history.push(`/appointments/${createAppointment.id}`);
    },
  });

  const [createPatientSurgery] = useMutation(CREATE_PATIENT_SURGERY, {
    onCompleted() {
      Alert.success('the Surgery has been created Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { createPatientSurgery: surgery } }) {
      updateCache([...patientSurgeries, surgery]);
    },
    onError() {
      Alert.error('Failed to create new Surgery');
    },
  });

  return useMemo(
    () => ({
      patientSurgeries,
      createPatientSurgery,
      updateCache,
      createAppointment: patientId =>
        createAppointment({
          variables: {
            input: {
              patient: patientId,
              type: APPT_TYPE.Surgery,
              clinicId: clinic.id,
              date: new Date(),
            },
          },
        }),
    }),
    [clinic.id, createAppointment, createPatientSurgery, patientSurgeries]
  );
};

export default usePatientSurgeries;
