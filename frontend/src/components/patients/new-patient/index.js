import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Form, InputNumber, Button, SelectPicker, Schema, Alert } from 'rsuite';

import { CREATE_PATIENT, LIST_PATIENTS } from 'apollo-client/queries';
import {
  CRSelectInput,
  CRTextInput,
  CRNumberInput,
  CRButton,
} from 'components';

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

  // console.log(formValue);

  return (
    <Form
      fluid
      model={model}
      formValue={formValue}
      onChange={value => SetFormValue(value)}
    >
      <CRSelectInput
        label="Membership Type"
        name="type"
        accepter={SelectPicker}
        searchable={false}
        data={membershipTypes}
        block
      />

      <CRTextInput label="Patient Name" name="name" />

      <CRTextInput label="Phone no" name="phoneNo" />

      <CRNumberInput label="Age" name="age" />

      <CRTextInput label="Guardian's Name" name="guardianName" />

      <CRTextInput label="Guardian's Phone No" name="guardianPhoneNo" />

      <CRSelectInput
        label="Sex"
        name="type"
        searchable={false}
        data={SEX}
        block
      />

      <CRButton
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
      </CRButton>
    </Form>
  );
}

export default NewPatient;
