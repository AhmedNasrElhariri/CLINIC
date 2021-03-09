import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_TEST_DEFINITION,
  EDIT_TEST_DEFINITION,
  LIST_TESTS_DEFINITION,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myLabsDefinitions => {
  client.writeQuery({
    query: LIST_TESTS_DEFINITION,
    data: {
      myLabsDefinitions,
    },
  });
};

function useLabsDefinition({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_TESTS_DEFINITION);
  const labsDefinition = useMemo(
    () => R.propOr([], 'myLabsDefinitions')(data),
    [data]
  );
  const [addLabDefinition] = useMutation(ADD_TEST_DEFINITION, {
    onCompleted() {
      Alert.success('the Lab has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addLabDefinition: labDefinition } }) {
      updateCache([...labsDefinition, labDefinition]);
    },
    onError() {
      Alert.error('Failed to add new Lab');
    },
  });
  const [editLabDefinition] = useMutation(EDIT_TEST_DEFINITION, {
    onCompleted() {
      Alert.success('the Lab has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the Lab');
    },
  });

  return useMemo(
    () => ({
      labsDefinition,
      addLabDefinition,
      editLabDefinition,
      updateCache,
    }),
    [labsDefinition, addLabDefinition, editLabDefinition]
  );
}

export default useLabsDefinition;
