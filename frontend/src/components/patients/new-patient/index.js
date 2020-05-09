import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  Form,
  InputNumber,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  SelectPicker,
  Schema,
  Alert,
} from 'rsuite';

import { FormStyled } from './style';
import { CREATE_PATIENT, LIST_PATIENTS } from 'apollo-client/queries';

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

function NewPatient({ onCreate }) {
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
    <FormStyled>
      <Form
        fluid
        model={model}
        formValue={formValue}
        onChange={value => SetFormValue(value)}
      >
        <FormGroup>
          <ControlLabel>Membership Type</ControlLabel>
          <FormControl
            name="type"
            accepter={SelectPicker}
            searchable={false}
            data={membershipTypes}
            block
          />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Patient Name</ControlLabel>
          <FormControl name="name" />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Phone no</ControlLabel>
          <FormControl name="phoneNo" />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Age</ControlLabel>
          <FormControl name="age" accepter={InputNumber} />
        </FormGroup>

        <FormGroup>
          <ControlLabel>Sex</ControlLabel>
          <FormControl
            name="sex"
            accepter={SelectPicker}
            searchable={false}
            data={SEX}
            block
          />
        </FormGroup>

        <Button
          appearance="primary"
          block
          onClick={() =>
            createPatient({
              variables: {
                input: { ...formValue, age: Number(formValue.age) },
              },
            })
          }
        >
          Create
        </Button>
      </Form>
    </FormStyled>
  );
}

export default NewPatient;
