import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import client from 'apollo-client/client';
import {
  DEFINE_SURGERY,
  LIST_SURGERIES,
  EDIT_SURGERY,
} from 'apollo-client/queries/surgery';

const updateCache = mySurgeries => {
  client.writeQuery({
    query: LIST_SURGERIES,
    data: {
      mySurgeries,
    },
  });
};

function useSurgeries({ onCreate, onEdit } = {}) {
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
      Alert.error('Failed to define new Surgery');
    },
  });

  const [editSurgery] = useMutation(EDIT_SURGERY, {
    onCompleted() {
      Alert.success('the Surgery has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the surgery');
    },
  });

  return useMemo(
    () => ({
      surgeries,
      defineSurgery,
      updateCache,
      editSurgery
    }),
    [defineSurgery, editSurgery, surgeries]
  );
}

export default useSurgeries;
