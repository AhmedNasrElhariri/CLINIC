import React, { useCallback, useEffect } from 'react';
import { Button, Alert } from 'rsuite';
import { v4 as uuidv4 } from 'uuid';
import Board from 'react-trello';
import { useMutation } from '@apollo/react-hooks';
import { EDIT_VIEW } from 'apollo-client/queries';

import Card from './card';
import useGlobalState from 'state';
import { mapLanesToGroupFields } from 'utils/view';

const addCard = ({ onAdd }) => {
  onAdd({
    id: uuidv4(),
    name: '',
    type: '',
    isNew: true,
    required: false,
  });
};

const addLane = ({ onAdd }) => {
  onAdd({
    id: uuidv4(),
    title: 'Untitled',
    isNew: true,
  });
};

const NewCardForm = props => {
  useEffect(() => {
    addCard(props);
  }, [props]);
  return null;
};

const NewLaneForm = props => {
  useEffect(() => {
    addLane(props);
  }, [props]);
  return null;
};

const components = {
  Card,
  NewCardForm,
  NewLaneForm,
};

export default function ViewCard() {
  const [editView] = useMutation(EDIT_VIEW, {
    onCompleted() {
      Alert.success('Group Fields Updated Successfully');
    },
    onError() {
      Alert.error('Failed To Save');
    },
  });
  const [lanes, setLanes] = useGlobalState('lanes');

  const onChange = useCallback(({ lanes }) => setLanes(lanes), [setLanes]);
  const onClick = useCallback(() => {
    editView({
      variables: {
        groups: mapLanesToGroupFields(lanes),
      },
    });
  }, [editView, lanes]);

  return (
    <>
      <Button onClick={onClick}>Save</Button>
      <Board
        laneStyle={{ cursor: 'pointer' }}
        data={{ lanes }}
        draggable
        editable
        canAddLanes
        editLaneTitle
        components={components}
        onDataChange={onChange}
      />
    </>
  );
}
