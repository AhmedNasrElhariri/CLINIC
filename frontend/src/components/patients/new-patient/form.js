import React from 'react';
import { Form, SelectPicker, Schema } from 'rsuite';

import { CRSelectInput, CRTextInput, CRNumberInput, ShowIf } from 'components';

const membershipTypes = [
  { name: 'Primary', value: 'Primary' },
  { name: 'Secondary', value: 'Secondary' },
];

const SEX = ['Male', 'Female'].map(s => ({
  name: s,
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

const isPrimary = ({ type }) => type === membershipTypes[0].value;
const isSecondary = ({ type }) => type === membershipTypes[1].value;

const NewPatient = ({ formValue, onChange }) => {
  return (
    <Form fluid model={model} formValue={formValue} onChange={onChange}>
      <CRSelectInput
        label="Membership Type"
        valueKey="value"
        name="type"
        data={membershipTypes}
        block
      />

      <CRTextInput label="Patient Name" name="name" />

      <ShowIf show={isPrimary(formValue)}>
        <CRTextInput label="Phone no" name="phoneNo" />
      </ShowIf>

      <ShowIf show={isSecondary(formValue)}>
        <CRTextInput label="Guardian's Name" name="guardianName" />
        <CRTextInput label="Guardian's Phone No" name="phoneNo" />
      </ShowIf>

      <CRNumberInput label="Age" name="age" />

      <CRSelectInput
        label="Sex"
        name="sex"
        valueKey="value"
        searchable={false}
        data={SEX}
        block
      />
    </Form>
  );
};

export default NewPatient;
