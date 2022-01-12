import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_APPOINTMENTTYPE_DEFINITION,
  EDIT_APPOINTMENTTYPE_DEFINITION,
  LIST_APPOINTMENTTYPES_DEFINITION,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myAppointmentTypesDefinition => {
  client.writeQuery({
    query: LIST_APPOINTMENTTYPES_DEFINITION,
    data: {
      myAppointmentTypesDefinition,
    },
  });
};

function useAppointmentTypesDefinition({ onCreate, onEdit, onDelete } = {}) {
  const { data } = useQuery(LIST_APPOINTMENTTYPES_DEFINITION);
  const appointmentTypesDefinitions = useMemo(
    () => R.propOr([], 'myAppointmentTypesDefinition')(data),
    [data]
  );

  const [addAppointmentTypeDefinition, { loading }] = useMutation(
    ADD_APPOINTMENTTYPE_DEFINITION,
    {
      onCompleted() {
        Alert.success('the Appointment Type has been Added Successfully');
        onCreate && onCreate();
      },
      update(cache, { data: { addAppointmentTypeDefinition: appointmentTypeDefinition } }) {
        updateCache([...appointmentTypesDefinitions, appointmentTypeDefinition]);
      },
      onError() {
        Alert.error('Failed to add new Appointment Type');
      },
    }
  );
  const [editAppointmentTypeDefinition] = useMutation(EDIT_APPOINTMENTTYPE_DEFINITION, {
    onCompleted() {
      Alert.success('the Appointment Type has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the AppointmentType');
    },
  });
  const [deleteAppointmentTypeDefinition] = useMutation(EDIT_APPOINTMENTTYPE_DEFINITION, {
    onCompleted() {
      Alert.success('the AppointmentType has been Deleted Successfully');
      onDelete && onDelete();
    },
    refetchQueries: [
      {
        query: LIST_APPOINTMENTTYPES_DEFINITION,
      },
    ],
    onError() {
      Alert.error('Failed to delete the AppointmentType');
    },
  });

  return useMemo(
    () => ({
      appointmentTypesDefinitions,
      addAppointmentTypeDefinition,
      editAppointmentTypeDefinition,
      deleteAppointmentTypeDefinition,
      updateCache,
      loading,
    }),
    [
      appointmentTypesDefinitions,
      addAppointmentTypeDefinition,
      editAppointmentTypeDefinition,
      deleteAppointmentTypeDefinition,
      loading,
    ]
  );
}

export default useAppointmentTypesDefinition;
