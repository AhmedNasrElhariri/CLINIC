import React, { useEffect } from 'react';
import { Alert } from 'rsuite';
import { useMutation } from '@apollo/react-hooks';

import { CREATE_DEFAULT_VIEW } from 'apollo-client/queries';

export default function CreateDefaultView() {
  const [createDefaultView] = useMutation(CREATE_DEFAULT_VIEW, {
    onCompleted() {
      Alert.success('Group Fields Updated Successfully');
    },
    onError() {
      Alert.error('Failed To Save');
    },
  });

  useEffect(() => {
    createDefaultView();
  }, [createDefaultView]);

  return null;
}
