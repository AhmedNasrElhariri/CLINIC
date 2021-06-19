import React, { useMemo } from 'react';
import { Form, Schema } from 'rsuite';
import * as R from 'ramda';
import { useQuery } from '@apollo/client';
import { ALL_AREAS } from  'apollo-client/queries';
import {
  CRSelectInput,
  CRTextInput,
  CRNumberInput,
  ShowIf,
  CRCheckBoxGroup,
} from 'components';

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

const options = [
  { name: 'FaceBook', value: 'facebook' },
  { name: 'Instagram', value: 'instagram' },
  { name: 'Twitter', value: 'twitter' },
  { name: 'Internet', value: 'Internet' },
  { name: 'BillBoard', value: 'billboard' },
  { name: 'Another Doctor', value: 'another doctor' },
  { name: 'Others', value: 'others' },
  { name: 'Friends', value: 'friends' },
];

const isPrimary = ({ type }) => type === membershipTypes[0].value;
const isSecondary = ({ type }) => type === membershipTypes[1].value;

const NewPatient = ({ formValue, onChange }) => {
  const { data } = useQuery(ALL_AREAS);
  const areas = useMemo(() => R.propOr([], 'areas')(data), [data]);
  const newAreas = areas.map(a => {
    return {
      id: a.city_name_ar,
      name: a.city_name_ar,
    };
  });
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
      <CRSelectInput label="Area" name="area" data={newAreas} block />
      <CRCheckBoxGroup
        label="Refernce"
        options={options}
        value={formValue.reference}
        onChange={val => onChange({ ...formValue, reference: val })}
        inline
      />
    </Form>
  );
};

export default NewPatient;
