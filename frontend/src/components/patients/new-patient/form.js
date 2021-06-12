import React, { useEffect, useMemo, useState } from 'react';
import { Form, SelectPicker, Schema } from 'rsuite';
import * as R from 'ramda';
import {
  CRSelectInput,
  CRTextInput,
  CRNumberInput,
  ShowIf,
  CRCheckBoxGroup,
} from 'components';
const fetch = require('node-fetch');
const getData = async () => {
  const response = await fetch(
    'https://parseapi.back4app.com/classes/Egyptcities_City?limit=10000&keys=name,cityId',
    {
      headers: {
        'X-Parse-Application-Id': 'xuOlHpX8MZ1FEq09w2vzqgy4HCorRoFvSuylRfki', // This is your app's application id
        'X-Parse-REST-API-Key': 'Th6myPQRCNvZ8xhJh3PC25MVKOrWSxn7VBMQXGSt', // This is your app's REST API key
      },
    }
  );
  const data = await response.json();
  return data;
};

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
  const [areas, setAreas] = useState([]);
  useEffect(() => {
    getData().then(result => {
      const newResult = R.propOr([], 'results')(result);
      const updatedData = newResult.map(d => {
        return {
          id: d.name,
          name: d.name,
        };
      });
      setAreas(updatedData);
    });
  }, []);
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
      <CRSelectInput label="Area" name="area" data={areas} block />
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
