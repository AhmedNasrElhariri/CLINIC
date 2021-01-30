import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_TEST_DEFINITION,
  EDIT_TEST_DEFINITION,
  LIST_TESTS_DEFINITION,
} from 'apollo-client/queries/test-definition';
import client from 'apollo-client/client';

const updateCache = myTestsDefinition => {
  client.writeQuery({
    query: LIST_TESTS_DEFINITION,
    data: {
      myTestsDefinition,
    },
  });
};

function useTestsDefinition({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_TESTS_DEFINITION);
  const testsDefinition = useMemo(() => R.propOr([], 'myTestsDefinition')(data), [data]);
  console.log(data);

  const [addTestDefinition] = useMutation(ADD_TEST_DEFINITION, {
    onCompleted() {
      Alert.success('the Test has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addTestDefinition: testDefinition } }) {
      updateCache([...testsDefinition, testDefinition]);
    },
    onError() {
      Alert.error('Failed to add new Test');
    },
  });
  const [editTestDefinition] = useMutation(EDIT_TEST_DEFINITION, {
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
      testsDefinition,
      addTestDefinition,
      editTestDefinition,
      updateCache,
    }),
    [testsDefinition,addTestDefinition,editTestDefinition]
  );
}

export default useTestsDefinition;
