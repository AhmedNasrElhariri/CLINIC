import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';
import {
  ADD_SESSION_DEFINITION,
  EDIT_SESSION_DEFINITION,
  LIST_SESSIONS_DEFINITION,
  LIST_SESSION_STATISTICS,
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

function useSessionDefinition({
  onCreate,
  onEdit,
  sessionsIds,
  dateFrom,
  dateTo,
} = {}) {
  const { data } = useQuery(LIST_SESSIONS_DEFINITION, {
    fetchPolicy: 'cache-first',
  });
  const sessionsDefinition = useMemo(
    () => R.propOr([], 'mySessionsDefinition')(data),
    [data]
  );
  const { data: sessionData } = useQuery(LIST_SESSION_STATISTICS, {
    variables: Object.assign(
      { sessionsIds: sessionsIds },
      dateFrom && { dateFrom },
      dateTo && { dateTo }
    ),
    fetchPolicy: 'cache-first',
  });
  const sessionStatistics = useMemo(
    () => R.propOr([], 'mySessionStatistic')(sessionData),
    [sessionData]
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
      sessionStatistics,
      updateCache,
      loading,
    }),
    [
      sessionsDefinition,
      addSessionDefinition,
      editSessionDefinition,
      sessionStatistics,
      loading,
    ]
  );
}

export default useSessionDefinition;
