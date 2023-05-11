import { useMemo } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import { Alert } from 'rsuite';

import {
  ADD_ROOM_DEFINITION,
  EDIT_ROOM_DEFINITION,
  LIST_ROOMS_DEFINITION,
} from 'apollo-client/queries';
import client from 'apollo-client/client';

const updateCache = myRoomsDefinition => {
  client.writeQuery({
    query: LIST_ROOMS_DEFINITION,
    data: {
      myRoomsDefinition,
    },
  });
};

function useRoomDefinition({ onCreate, onEdit } = {}) {
  const { data } = useQuery(LIST_ROOMS_DEFINITION);
  const roomsDefinition = useMemo(
    () => R.propOr([], 'myRoomsDefinition')(data),
    [data]
  );

  const [addRoomDefinition, { loading }] = useMutation(ADD_ROOM_DEFINITION, {
    onCompleted() {
      Alert.success('the Room has been Added Successfully');
      onCreate && onCreate();
    },
    update(cache, { data: { addRoomDefinition: RoomDefinition } }) {
      updateCache([...roomsDefinition, RoomDefinition]);
    },
    onError() {
      Alert.error('Failed to add new Room');
    },
  });
  const [editRoomDefinition] = useMutation(EDIT_ROOM_DEFINITION, {
    onCompleted() {
      Alert.success('the Room has been Edited Successfully');
      onEdit && onEdit();
    },
    onError() {
      Alert.error('Failed to edit the Room');
    },
  });

  return useMemo(
    () => ({
      roomsDefinition,
      addRoomDefinition,
      editRoomDefinition,
      updateCache,
      loading,
    }),
    [roomsDefinition, addRoomDefinition, editRoomDefinition, loading]
  );
}

export default useRoomDefinition;
