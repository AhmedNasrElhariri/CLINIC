import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Alert,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  SelectPicker,
} from 'rsuite';
import { useMutation } from '@apollo/client';
import { CREATE_VIEW } from 'apollo-client/queries';
import { useLocation } from 'react-router';
import useGlobalState from 'state';
import { mapLanesToGroupFields } from 'utils/view';
import { ViewForm } from 'components';
import { appointmentTypes } from 'services/appointment';

const json = [];
const width = 300;

export default function CreateView({}) {
  const [lanes, setLanes] = useGlobalState('lanes');
  const [formValue, setFormValue] = useState({ name: '', type: null });
  const location = useLocation();
  const viewId = location?.state?.id || null;
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
          <FormControl style={{ width }} name="name" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Type</ControlLabel>
          <FormControl
            accepter={SelectPicker}
            style={{ width }}
            name="type"
            data={appointmentTypes}
            labelKey="name"
            valueKey="id"
          />
        </FormGroup>

        {viewId ? (
          <Button appearance="primary" disabled onClick={onClick}>
            Update
          </Button>
        ) : (
          <Button appearance="primary" onClick={onClick}>
            Create
          </Button>
        )}
      </Form>
      <ViewForm />
    </>
  );
}
