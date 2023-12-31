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

function useLabCategory({ onCreate, onEdit, onDelete } = {}) {
  const { data } = useQuery(LIST_LABS_CATEGORY);
  const labsCategory = useMemo(
    () => R.propOr([], 'myLabsCategory')(data),
    [data]
  );
  const [addLabCategory, { loading }] = useMutation(ADD_LAB_CATEGORY, {
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
      Alert.success('the Lab Category has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the Lab Category');
    },
  });
  const [deleteLabCategory] = useMutation(EDIT_LAB_CATEGORY, {
    onCompleted() {
      Alert.success('the Lab Category has been deleted Successfully');
      onDelete && onDelete();
    },
    refetchQueries: [
      {
        query: LIST_LABS_CATEGORY,
      },
    ],
    onError() {
      Alert.error('Failed to delete the Lab Category');
    },
  });

  return useMemo(
    () => ({
      labsCategory,
      addLabCategory,
      deleteLabCategory,
      editLabCategory,
      updateCache,
      loading,
    }),
    [labsCategory, addLabCategory, editLabCategory, deleteLabCategory, loading]
  );
}

export default useLabCategory;
