import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_IMAGE_DEFINITION,
  EDIT_IMAGE_DEFINITION,
  LIST_IMAGES_DEFINITION,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myImagesDefinition => {
  client.writeQuery({
    query: LIST_IMAGES_DEFINITION,
    data: {
      myImagesDefinition,
    },
  });
};

function useImageDefinition({ onCreate, onEdit, categoryId } = {}) {
  const { data } = useQuery(LIST_IMAGES_DEFINITION, {
    variables: {
      categoryId: categoryId,
    },
  });
  const imagesDefinition = useMemo(
    () => R.propOr([], 'myImagesDefinition')(data),
    [data]
  );

  const [addImageDefinition] = useMutation(ADD_IMAGE_DEFINITION, {
    onCompleted() {
      Alert.success('the Image has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addImageDefinition: imageDefinition } }) {
      updateCache([...imagesDefinition, imageDefinition]);
    },
    onError() {
      Alert.error('Failed to add new Image');
    },
  });
  const [editImageDefinition] = useMutation(EDIT_IMAGE_DEFINITION, {
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
      imagesDefinition,
      addImageDefinition,
      editImageDefinition,
      updateCache,
    }),
    [imagesDefinition, addImageDefinition, editImageDefinition]
  );
}

export default useImageDefinition;
