import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_HOSPITAL,
  EDIT_HOSPITAL,
  LIST_HOSPITALS,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myHospitals => {
  client.writeQuery({
    query: LIST_HOSPITALS,
    data: {
      myHospitals,
    },
  });
};

function useHospitals({ onCreate, onEdit, onDelete } = {}) {
  const { data } = useQuery(LIST_HOSPITALS, { fetchPolicy: 'cache-first' });
  const hospitals = useMemo(() => R.propOr([], 'myHospitals')(data), [data]);

  const [addHospital] = useMutation(ADD_HOSPITAL, {
    onCompleted() {
      Alert.success('the Hospital has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addHospital: hospital } }) {
      updateCache([...hospitals, hospital]);
    },
    onError() {
      Alert.error('Failed to add new Hospital');
    },
  });

  const [editHospital] = useMutation(EDIT_HOSPITAL, {
    onCompleted() {
      Alert.success('the Hospital has been Edited Successfully');
      onEdit && onEdit();
    },
    update(cache, { data: { editHospital: hospital } }) {
      const newHoss = hospitals.map(h => (h.id === hospital.id ? hospital : h));
      updateCache([...newHoss]);
    },
    onError() {
      Alert.error('Failed to edit the Hospital');
    },
  });
  const [deleteHospital] = useMutation(EDIT_HOSPITAL, {
    onCompleted() {
      Alert.success('the Hospital has been Deleted Successfully');
      onDelete && onDelete();
    },
    refetchQueries: [
      {
        query: LIST_HOSPITALS,
      },
    ],
    onError() {
      Alert.error('Failed to delete the Hospital');
    },
  });

  return useMemo(
    () => ({
      hospitals,
      addHospital,
      editHospital,
      deleteHospital,
      updateCache,
    }),
    [addHospital, editHospital, deleteHospital, hospitals]
  );
}

export default useHospitals;
