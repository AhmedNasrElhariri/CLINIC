import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import { ADD_TIMING, EDIT_TIMING, LIST_TIMINGS } from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myTimings => {
  client.writeQuery({
    query: LIST_TIMINGS,
    data: {
      myTimings,
    },
  });
};

function useTimings({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_TIMINGS);
  const timings = useMemo(() => R.propOr([], 'myTimings')(data), [data]);
  const [addTiming] = useMutation(ADD_TIMING, {
    onCompleted() {
      Alert.success('the Timing has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addTiming: timing } }) {
      updateCache([...timings, timing]);
    },
    onError() {
      Alert.error('Failed to add new Timing');
    },
  });
  const [editTiming] = useMutation(EDIT_TIMING, {
    onCompleted() {
      Alert.success('the Timing has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the Timing');
    },
  });

  return useMemo(
    () => ({
      timings,
      addTiming,
      editTiming,
      updateCache,
    }),
    [timings, addTiming, editTiming]
  );
}

export default useTimings;
