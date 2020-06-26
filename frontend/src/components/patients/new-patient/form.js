import React from 'react';
import { Form, SelectPicker, Schema } from 'rsuite';

import {
  CRSelectInput,
  CRTextInput,
  CRNumberInput,
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

const NewPatient = ({ formValue, onChange }) => {
  return (
    <Form
      fluid
      model={model}
      formValue={formValue}
      onChange={onChange}
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

      <CRSelectInput
        label="Sex"
        name="sex"
        searchable={false}
        data={SEX}
        block
      />

      {/* <CRTextInput label="Guardian's Name" name="guardianName" />

      <CRTextInput label="Guardian's Phone No" name="guardianPhoneNo" /> */}
    </Form>
  );
};

export default NewPatient;
