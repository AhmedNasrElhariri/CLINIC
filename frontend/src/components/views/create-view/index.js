import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Alert,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
} from 'rsuite';
import { useMutation } from '@apollo/client';
import { CREATE_VIEW } from 'apollo-client/queries';

import useGlobalState from 'state';
import { mapLanesToGroupFields } from 'utils/view';
import { ViewForm } from 'components';

const json = [
  {
    cards: [
      {
        id: 'f15011c7-d838-44e8-b30a-621cf595dfb5',
        isNew: true,
        laneId: '60a41858-2bda-4ee3-8530-247a18fc230d',
        name: 'complain',
        required: false,
        type: 'LongText',
      },
    ],
    currentPage: 1,
    id: '60a41858-2bda-4ee3-8530-247a18fc230d',
    isNew: true,
    title: 'Complain',
  },
  {
    currentPage: 1,
    id: 'df0933c9-b625-41a0-88c7-606253ca5a5a',
    isNew: true,
    title: 'vital date',
    cards: [
      {
        id: 'a3d16f65-5136-409e-abf3-d9cd59b57097',
        isNew: true,
        laneId: 'df0933c9-b625-41a0-88c7-606253ca5a5a',
        name: 'height',
        required: false,
        type: 'Number',
      },
      {
        id: '254ff069-a641-4b69-ab6e-d1ab161ed180',
        isNew: true,
        laneId: 'df0933c9-b625-41a0-88c7-606253ca5a5a',
        name: 'weight',
        required: false,
        type: 'Number',
      },
    ],
  },
];

export default function CreateView() {
  const [lanes, setLanes] = useGlobalState('lanes');
  const [formValue, setFormValue] = useState({ name: '' });

  useEffect(() => setLanes(json), [setLanes]);

  const [createView] = useMutation(CREATE_VIEW, {
    onCompleted() {
      Alert.success('Group Fields Updated Successfully');
    },
    onError() {
      Alert.error('Failed To Save');
    },
  });

  const onClick = useCallback(() => {
    createView({
      variables: {
        view: {
          ...formValue,
          fieldGroups: mapLanesToGroupFields(lanes),
        },
      },
    });
  }, [createView, formValue, lanes]);

  return (
    <>
      <Form layout="inline" formValue={formValue} onChange={setFormValue}>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <FormControl name="name" />
        </FormGroup>
        <Button onClick={onClick}>Create</Button>
      </Form>
      <ViewForm />
    </>
  );
}
