import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_TEST,
  EDIT_TEST,
  LIST_TESTS,
} from 'apollo-client/queries/test';
import client from 'apollo-client/client';

const updateCache = myTests => {
  client.writeQuery({
    query: LIST_TESTS,
    data: {
      myTests,
    },
  });
};

function useTests({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_TESTS);
  const tests = useMemo(() => R.propOr([], 'myTests')(data), [data]);
  const [addTest] = useMutation(ADD_TEST, {
    onCompleted() {
      Alert.success('the Test has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addTest: test } }) {
      updateCache([...tests, test]);
    },
    onError() {
      Alert.error('Failed to add new Test');
    },
  });

  const [editTest] = useMutation(EDIT_TEST, {
    onCompleted() {
      Alert.success('the Test has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the Test');
    },
  });

  return useMemo(
    () => ({
      tests,
      addTest,
      editTest,
      updateCache,
    }),
    [tests,addTest,editTest,updateCache]
  );
}

export default useTests;
