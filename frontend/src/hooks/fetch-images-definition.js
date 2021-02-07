import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_IMAGE_DEFINITION,
  EDIT_IMAGE_DEFINITION,
  LIST_IMAGES_DEFINITION,
} from 'apollo-client/queries/image-definition';
import client from 'apollo-client/client';

const updateCache = myImagesDefinition => {
  client.writeQuery({
    query: LIST_IMAGES_DEFINITION,
    data: {
      myImagesDefinition,
    },
  });
};

function useImagesDefinition({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_IMAGES_DEFINITION);
  const imagesDefinition = useMemo(
    () => R.propOr([], 'myImagesDefinition')(data),
    [data]
  );
  console.log(data);

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

export default useImagesDefinition;
