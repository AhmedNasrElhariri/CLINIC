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
import { useQuery, useMutation } from '@apollo/client';
import {
  UPDATE_PATIENT_VIEW,
  MY_PATIENT_VIEW,
  LIST_ORGANIZATION_DOCTORS,
} from 'apollo-client/queries';
import { useLocation } from 'react-router';
import useGlobalState from 'state';
import { mapLanesToGroupFields, mapGroupFieldsToLanes } from 'utils/view';
import { ViewForm } from 'components';
import { appointmentTypes } from 'services/appointment';
import * as R from 'ramda';

const json = [];
const width = 300;

export default function CreateView({}) {
  const [lanes, setLanes] = useGlobalState('lanes');
  const { data: doctorsData } = useQuery(LIST_ORGANIZATION_DOCTORS);
  const doctors = useMemo(
    () => R.propOr([], 'listOrganizationDoctors')(doctorsData),
    [doctorsData]
  );
  const [formValue, setFormValue] = useState({
    name: '',
    type: null,
    viewId: null,
  });
  const location = useLocation();
  const viewId = location?.state?.id || null;
  const { data } = useQuery(MY_PATIENT_VIEW, {
    variables: {
      id: viewId,
    },
  });
  const view = useMemo(() => {
    return R.pipe(R.propOr({}, 'MyPatientView'))(data);
  }, [data]);
  const [updatePatientView] = useMutation(UPDATE_PATIENT_VIEW, {
    onCompleted() {
      Alert.success('Group Fields Updated Successfully');
    },
    onError() {
      Alert.error('Failed To Save');
    },
  });

  const onClick = useCallback(() => {
    const { viewId, ...rest } = formValue;
    updatePatientView({
      variables: {
        view: {
          ...rest,
          fieldGroups: mapLanesToGroupFields(lanes),
        },
        viewId: viewId,
      },
    });
  }, [updatePatientView, formValue, lanes]);
  useEffect(() => {
    const fieldGroups = R.propOr([], 'fieldGroups')(view);
    const { id, name, type } = view;
    setFormValue({ ...formValue, viewId: id, name: name, type: type });
    const lanes = mapGroupFieldsToLanes(fieldGroups);
    setLanes(lanes);
  }, [view, setLanes]);
  return (
    <>
      <Form layout="inline" formValue={formValue} onChange={setFormValue}>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <FormControl style={{ width }} name="name" />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Doctor</ControlLabel>
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
          <Button appearance="primary" onClick={onClick}>
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
