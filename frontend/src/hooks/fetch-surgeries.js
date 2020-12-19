import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import client from 'apollo-client/client';
import { DEFINE_SURGERY, LIST_SURGERIES } from 'apollo-client/queries/surgery';

const updateCache = mySurgeries => {
  client.writeQuery({
    query: LIST_SURGERIES,
    data: {
      mySurgeries,
    },
  });
};

function useSurgeries({ onCreate }) {
  const { data } = useQuery(LIST_SURGERIES);
  const surgeries = useMemo(() => R.propOr([], 'mySurgeries')(data), [data]);

  const [defineSurgery] = useMutation(DEFINE_SURGERY, {
    onCompleted() {
      Alert.success('the Surgery has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { defineSurgery: surgery } }) {
      updateCache([...surgeries, surgery]);
    },
    onError() {
      Alert.error('Failed to add new Hospital');
    },
  });

  return useMemo(
    () => ({
      surgeries,
      defineSurgery,
      updateCache,
    }),
    [defineSurgery, surgeries]
  );
}

export default useSurgeries;
