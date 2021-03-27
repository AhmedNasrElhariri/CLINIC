import { useMemo, useCallback } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';

import { CREATE_EVENT, LIST_EVENTS } from 'apollo-client/queries';
import client from 'apollo-client/client';
import { Alert } from 'rsuite';

function useEvents({ onCreated }) {
  const { data } = useQuery(LIST_EVENTS);

  const events = R.propOr([], 'myEvents')(data);

  const updateCache = useCallback(myEvents => {
    client.writeQuery({
      query: LIST_EVENTS,
      data: {
        myEvents,
      },
    });
  }, []);

  const [createEvent] = useMutation(CREATE_EVENT, {
    onCompleted: () => {
      Alert.success('Event has been created successfully');
      onCreated();
    },
    update(cache, { data: { createEvent: event } }) {
      updateCache([...events, event]);
    },
  });

  const handleCreate = useCallback(
    event => createEvent({ variables: { event } }),
    [createEvent]
  );

  return useMemo(
    () => ({
      events,
      createEvent: handleCreate,
      updateCache,
    }),
    [events, handleCreate, updateCache]
  );
}

export default useEvents;
