import React, { useCallback, useEffect } from 'react';
import { Button } from 'rsuite';
import { v4 as uuidv4 } from 'uuid';

import Board from 'react-trello';
import defaultValue from './data';
import Card from './card';
import useGlobalState from 'state';

const addCard = ({ onAdd }) => {
  onAdd({
    id: uuidv4(),
    name: '',
    type: '',
    required: false,
  });
};

const NewCardForm = props => {
  useEffect(() => {
    addCard(props);
  }, [props]);
  return null;
};

const save = () => {};

const components = {
  Card,
  NewCardForm,
};

export default function ViewCard() {
  const [lanes, setLanes] = useGlobalState('lanes');
  const onChange = useCallback(({ lanes }) => setLanes(lanes), [setLanes]);

  useEffect(() => {
    setLanes(defaultValue);
  }, [setLanes]);

  return (
    <>
      <Button onClick={save}>Save</Button>
      <Board
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
