import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_IMAGE_CATEGORY,
  EDIT_IMAGE_CATEGORY,
  LIST_IMAGES_CATEGORY,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myImagesCategory => {
  client.writeQuery({
    query: LIST_IMAGES_CATEGORY,
    data: {
      myImagesCategory,
    },
  });
};

function useImagesCategory({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_IMAGES_CATEGORY);
  const imagesCategory = useMemo(
    () => R.propOr([], 'myImagesCategory')(data),
    [data]
  );
  console.log(data);

  const [addImageCategory] = useMutation(ADD_IMAGE_CATEGORY, {
    onCompleted() {
      Alert.success('the Image has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addImageCategory: imageCategory } }) {
      updateCache([...imagesCategory, imageCategory]);
    },
    onError() {
      Alert.error('Failed to add new Image');
    },
  });
  const [editImageCategory] = useMutation(EDIT_IMAGE_CATEGORY, {
    onCompleted() {
      Alert.success('the Image has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the Image');
    },
  });

  return useMemo(
    () => ({
      imagesCategory,
      addImageCategory,
      editImageCategory,
      updateCache,
    }),
    [imagesCategory, addImageCategory, editImageCategory]
  );
}

export default useImagesCategory;
