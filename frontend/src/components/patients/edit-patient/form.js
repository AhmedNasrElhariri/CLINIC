import React from 'react';
import { Form, SelectPicker, Schema } from 'rsuite';

import { CRSelectInput, CRTextInput, CRNumberInput, ShowIf } from 'components';

const membershipTypes = [
  { name: 'Primary', id: 'Primary' },
  { name: 'Secondary', id: 'Secondary' },
];

const SEX = ['Male', 'Female'].map(s => ({
  name: s,
  id: s,
}));
const patientOldOrNew = [
  { name: 'Old', value: 'Old' },
  { name: 'New', value: 'New' },
];
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

const isPrimary = ({ type }) => type === membershipTypes[0].id;
const isSecondary = ({ type }) => type === membershipTypes[1].id;

const NewPatient = ({ formValue, onChange, t }) => {
  return (
    <Form fluid model={model} formValue={formValue} onChange={onChange}>
      <CRSelectInput
        label={t('membershipType')}
        name="type"
        data={membershipTypes}
        block
      />

      <CRTextInput label={t('patient')} name="name" />

      <ShowIf show={isPrimary(formValue)}>
        <CRTextInput label={t('phoneNo')} name="phoneNo" />
        <CRTextInput label={t('phoneNoTwo')} name="phoneNoTwo" />
      </ShowIf>

      <ShowIf show={isSecondary(formValue)}>
        <CRTextInput label={t('guardiansName')} name="guardianName" />
        <CRTextInput label={t('guardiansPhoneNo')} name="phoneNo" />
      </ShowIf>

      <CRNumberInput label={t('age')} name="age" />
      <CRTextInput label={t('code')} name="code" />
      <CRSelectInput
        label={t('sex')}
        name="sex"
        searchable={false}
        data={SEX}
        block
      />
      <CRSelectInput
        label={t('OldOrNew')}
        name="oldOrNew"
        valueKey="value"
        searchable={false}
        data={patientOldOrNew}
        block
      />
    </Form>
  );
};

export default NewPatient;
