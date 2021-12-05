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

function useTimings({ onCreate, onEdit, onDelete } = {}) {
  const { data } = useQuery(LIST_TIMINGS);
  const timings = useMemo(() => R.propOr([], 'myTimings')(data), [data]);
  const [addTiming, { loading }] = useMutation(ADD_TIMING, {
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
  const [deleteTiming] = useMutation(EDIT_TIMING, {
    onCompleted() {
      Alert.success('the Timing has been Deleted Successfully');
      onDelete && onDelete();
    },
    refetchQueries: [
      {
        query: LIST_TIMINGS,
      },
    ],
    onError() {
      Alert.error('Failed to delete the Timing');
    },
  });

  return useMemo(
    () => ({
      timings,
      addTiming,
      editTiming,
      deleteTiming,
      updateCache,
      loading,
    }),
    [timings, addTiming, editTiming, deleteTiming, loading]
  );
}

export default useTimings;
