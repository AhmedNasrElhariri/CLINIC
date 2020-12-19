import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import { ADD_HOSPITAL, LIST_HOSPITALS } from 'apollo-client/queries/hospital';
import client from 'apollo-client/client';

const updateCache = myHospitals => {
  client.writeQuery({
    query: LIST_HOSPITALS,
    data: {
      myHospitals,
    },
  });
};

function useHospitals({ onCreate }) {
  const { data } = useQuery(LIST_HOSPITALS);
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

  return useMemo(
    () => ({
      hospitals,
      addHospital,
      updateCache,
    }),
    [addHospital, hospitals]
  );
}

export default useHospitals;
