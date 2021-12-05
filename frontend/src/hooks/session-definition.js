import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';
import {
  ADD_SESSION_DEFINITION,
  EDIT_SESSION_DEFINITION,
  LIST_SESSIONS_DEFINITION,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = mySessionsDefinition => {
  client.writeQuery({
    query: LIST_SESSIONS_DEFINITION,
    data: {
      mySessionsDefinition,
    },
  });
};

function useSessionDefinition({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_SESSIONS_DEFINITION);
  const sessionsDefinition = useMemo(
    () => R.propOr([], 'mySessionsDefinition')(data),
    [data]
  );

  const [addSessionDefinition, { loading }] = useMutation(
    ADD_SESSION_DEFINITION,
    {
      onCompleted() {
        Alert.success('the Session has been Added Successfully');
        onCreate && onCreate();
      },
      update(cache, { data: { addSessionDefinition: sessionDefinition } }) {
        updateCache([...sessionsDefinition, sessionDefinition]);
      },
      onError() {
        Alert.error('Failed to add new Session');
      },
    }
  );
  const [editSessionDefinition] = useMutation(EDIT_SESSION_DEFINITION, {
    onCompleted() {
      Alert.success('the Session has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the Session');
    },
  });

  return useMemo(
    () => ({
      sessionsDefinition,
      addSessionDefinition,
      editSessionDefinition,
      updateCache,
      loading,
    }),
    [sessionsDefinition, addSessionDefinition, editSessionDefinition, loading]
  );
}

export default useSessionDefinition;
