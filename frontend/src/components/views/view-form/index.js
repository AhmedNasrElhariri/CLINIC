import React, { useCallback, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Board from 'react-trello';
import {
  AddCardLink as DAddCardLink,
  NewLaneSection as DNewLaneSection,
} from 'react-trello/dist/styles/Base';
import { AddLaneLink as DAddLaneLink } from 'react-trello/dist/styles/Elements';
import Card from './card';
import useGlobalState from 'state';

const addCard = ({ onAdd }) => {
  onAdd({
    id: nanoid(),
    name: '',
    type: '',
    isNew: true,
    choices: [],
  });
};

const addLane = ({ onAdd }) => {
  onAdd({
    id: nanoid(),
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

const NewLaneSection = ({ onClick }) => (
  <DNewLaneSection>
    <DAddLaneLink onClick={onClick}>+ Add Field Group</DAddLaneLink>
  </DNewLaneSection>
);

const AddCardLink = ({ onClick }) => (
  <DAddCardLink onClick={onClick}>Add Field</DAddCardLink>
);
const components = {
  Card,
  NewCardForm,
  NewLaneForm,
  NewLaneSection,
  AddCardLink,
};
export default function ViewForm() {
  const [lanes, setLanes] = useGlobalState('lanes');
  const onDataChange = useCallback(({ lanes }) => setLanes(lanes), [setLanes]);
  return (
    <>
      <Board
        laneStyle={{ cursor: 'pointer' }}
        data={{ lanes }}
        draggable
        editable
        canAddLanes
        editLaneTitle
        components={components}
        onDataChange={onDataChange}
      />
    </>
  );
}
