import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
  Button,
  Alert,
  Form,
  FormControl,
  FormGroup,
  ControlLabel,
  SelectPicker,
} from 'rsuite';
import { useMutation, useQuery } from '@apollo/client';
import * as R from 'ramda';
import {
  CREATE_PATIENT_VIEW,
  LIST_ORGANIZATION_DOCTORS,
} from 'apollo-client/queries';
import { useLocation } from 'react-router';
import useGlobalState from 'state';
import { mapLanesToGroupFields } from 'utils/view';
import { ViewForm } from 'components';

const json = [];
const width = 300;

export default function CreateView() {
  const [lanes, setLanes] = useGlobalState('lanes');
  const [formValue, setFormValue] = useState({ name: '', userId: null });
  const { data: doctorsData } = useQuery(LIST_ORGANIZATION_DOCTORS);
  const location = useLocation();
  const viewId = location?.state?.id || null;
  const doctors = useMemo(
    () => R.propOr([], 'listOrganizationDoctors')(doctorsData),
    [doctorsData]
  );
  useEffect(() => setLanes(json), [setLanes]);

  const [createPatientView] = useMutation(CREATE_PATIENT_VIEW, {
    onCompleted() {
      Alert.success('Group Fields Updated Successfully');
    },
    onError() {
      Alert.error('Failed To Save');
    },
  });

  const onClick = useCallback(() => {
    createPatientView({
      variables: {
        view: {
          ...formValue,
          fieldGroups: mapLanesToGroupFields(lanes),
        },
      },
    });
  }, [createPatientView, formValue, lanes]);

  return (
    <>
      <Form layout="inline" formValue={formValue} onChange={setFormValue}>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <FormControl style={{ width }} name="name" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>User</ControlLabel>
          <FormControl
            accepter={SelectPicker}
            style={{ width }}
            name="userId"
            data={doctors}
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
