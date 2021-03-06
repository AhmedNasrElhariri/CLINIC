import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_LAB_CATEGORY,
  EDIT_LAB_CATEGORY,
  LIST_LABS_CATEGORY,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myLabsCategory => {
  client.writeQuery({
    query: LIST_LABS_CATEGORY,
    data: {
      myLabsCategory,
    },
  });
};

function useLabsCategory({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_LABS_CATEGORY);
  const labsCategory = useMemo(
    () => R.propOr([], 'myLabsCategory')(data),
    [data]
  );
  const [addLabCategory] = useMutation(ADD_LAB_CATEGORY, {
    onCompleted() {
      Alert.success('the Test has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addLabCategory: labCategory } }) {
      updateCache([...labsCategory, labCategory]);
    },
    onError() {
      Alert.error('Failed to add new Test');
    },
  });
  const [editLabCategory] = useMutation(EDIT_LAB_CATEGORY, {
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
      labsCategory,
      addLabCategory,
      editLabCategory,
      updateCache,
    }),
    [labsCategory, addLabCategory, editLabCategory]
  );
}

export default useLabsCategory;
