import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import client from 'apollo-client/client';
import {
  CREATE_PATIENT_SURGERY,
  LIST_PATIENT_SURGERIES,
  LIST_REVENUES,
  EDIT_PATIENT_SURGERY,
} from 'apollo-client/queries';

const updateCache = patientSurgeries => {
  client.writeQuery({
    query: LIST_PATIENT_SURGERIES,
    data: {
      patientSurgeries,
    },
  });
};

const usePatientSurgeries = ({
  onCreate,
  surgery,
  hospital,
  patientId,
  time,
  page,
}) => {
  const { data } = useQuery(LIST_PATIENT_SURGERIES, {
    variables: Object.assign(
      {
        offset: (page - 1) * 20 || 0,
        limit: 20,
      },
      time && { dateFrom: time[0] },
      time && { dateTo: time[1] },
      hospital && { hospital: hospital },
      surgery && { surgery: surgery },
      patientId && { patientId: patientId }
    ),
  });
  const surgeries = data?.patientSurgeries;
  const patientSurgeries = useMemo(
    () => R.propOr([], 'surgeries')(surgeries),
    [surgeries]
  );
  const patientSurgeriesCount = useMemo(
    () => R.propOr([], 'surgeriesCount')(surgeries),
    [surgeries]
  );

  const [createPatientSurgery, { loading }] = useMutation(
    CREATE_PATIENT_SURGERY,
    {
      onCompleted() {
        Alert.success('the Surgery has been created Successfully');
        onCreate && onCreate();
      },
      refetchQueries: [
        {
          query: LIST_REVENUES,
        },
        {
          query: LIST_PATIENT_SURGERIES,
          variables: Object.assign(
            {
              offset: (page - 1) * 20 || 0,
              limit: 20,
            },
            time && { dateFrom: time[0] },
            time && { dateTo: time[1] },
            hospital && { hospital: hospital },
            surgery && { surgery: surgery },
            patientId && { patientId: patientId }
          ),
        },
      ],
      onError() {
        Alert.error('Failed to create new Surgery');
      },
    }
  );
  const [editPatientSurgery] = useMutation(EDIT_PATIENT_SURGERY, {
    onCompleted() {
      Alert.success('the Surgery has been updated Successfully');
      onCreate && onCreate();
    },
    refetchQueries: [
      {
        query: LIST_REVENUES,
      },
      {
        query: LIST_PATIENT_SURGERIES,
        variables: Object.assign(
          {
            offset: (page - 1) * 20 || 0,
            limit: 20,
          },
          time && { dateFrom: time[0] },
          time && { dateTo: time[1] },
          hospital && { hospital: hospital },
          surgery && { surgery: surgery },
          patientId && { patientId: patientId }
        ),
      },
    ],
    onError() {
      Alert.error('Failed to create new Surgery');
    },
  });

  return useMemo(
    () => ({
      patientSurgeries,
      patientSurgeriesCount,
      createPatientSurgery: patientSurgery => {
        createPatientSurgery({
          variables: {
            patientSurgery,
          },
        });
      },
      editPatientSurgery: patientSurgery => {
        editPatientSurgery({
          variables: {
            patientSurgery,
          },
        });
      },
      updateCache,
      loading,
    }),
    [
      editPatientSurgery,
      createPatientSurgery,
      patientSurgeries,
      patientSurgeriesCount,
      loading,
    ]
  );
};

export default usePatientSurgeries;
