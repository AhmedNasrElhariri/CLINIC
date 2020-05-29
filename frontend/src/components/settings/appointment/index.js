import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import {
  Form,
  InputNumber,
  FormGroup,
  Slider,
  RangeSlider,
  FormControl,
  ControlLabel,
  Button,
  SelectPicker,
  Schema,
  Alert,
  Panel,
  DatePicker,
  DateRangePicker,
  PanelGroup,
} from 'rsuite';

import { FormStyled } from './style';
import { CREATE_PATIENT, LIST_PATIENTS } from 'apollo-client/queries';
import WorkingHours from './working-hours';
import { Div } from '../../widgets/index';

const membershipTypes = [
  { label: 'Primary', value: 'Primary' },
  { label: 'Secondary', value: 'Secondary' },
];

const SEX = ['Male', 'Female'].map(s => ({
  label: s,
  value: s,
}));

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('User name is required'),
  phoneNo: StringType()
    .isRequired('Required')
    .pattern(/^(01(0|1|2|5)\d{8})$/, 'Invalid Phone No'),
  age: NumberType('Age should be a number').range(
    0,
    100,
    'Age should be 0-100 years old'
  ),
});

const initialValues = {
  name: '',
  phoneNo: '',
  age: '',
};

function AppointmentSettings({ onCreate }) {
  const [formValue, SetFormValue] = useState(initialValues);
  const [createPatient] = useMutation(CREATE_PATIENT, {
    update(cache, { data: { createPatient: patient } }) {
      const { patients } = cache.readQuery({ query: LIST_PATIENTS });
      cache.writeQuery({
        query: LIST_PATIENTS,
        data: { patients: patients.concat([patient]) },
      });
    },
    onCompleted: () => {
      onCreate();
      Alert.success('Patient Created Successfully');
    },
    onError: () => Alert.error('Invalid Input'),
  });

  return (
    <PanelGroup bordered>
      <Panel header="Appointment Info">
        <Form
          fluid
          model={model}
          formValue={formValue}
          onChange={value => SetFormValue(value)}
        >
          <Div width={300}>
            <FormGroup>
              <ControlLabel>Examination Price</ControlLabel>
              <FormControl name="duration" accepter={InputNumber} />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Followup Price</ControlLabel>
              <FormControl name="duration" accepter={InputNumber} />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Duration</ControlLabel>
              <FormControl name="duration" accepter={InputNumber} />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Count per day</ControlLabel>
              <FormControl name="count" accepter={InputNumber} />
            </FormGroup>
          </Div>
        </Form>
      </Panel>
      <Panel header="Working Hours">
        <WorkingHours />
      </Panel>
    </PanelGroup>
  );
}

export default AppointmentSettings;
