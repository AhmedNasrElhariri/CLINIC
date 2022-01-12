import React, { useEffect } from 'react';
import { Form } from 'rsuite';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  CRSelectInput,
  CRTextInput,
  CRNumberInput,
  CRDatePicker,
  ShowIf,
  CRCheckBoxGroup,
  Div,
  CRLabel,
} from 'components';
import moment from 'moment';

const membershipTypes = [
  { name: 'Primary', value: 'Primary' },
  { name: 'Secondary', value: 'Secondary' },
];

const SEX = ['Male', 'Female'].map(s => ({
  name: s,
  value: s,
}));

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

const NewPatient = ({ formValue, onChange, newAreas, checkResult, show }) => {
  useEffect(() => {
    if (formValue.date) {
      const years = moment().diff(formValue.date, 'years');
      onChange({ ...formValue, age: years });
    }
  }, [formValue.date]);
  return (
    <Form fluid formValue={formValue} onChange={onChange}>
      <CRSelectInput
        label="Membership Type"
        valueKey="value"
        name="type"
        data={membershipTypes}
        block
      />
      <CRTextInput
        label="Patient Name"
        name="name"
        errorMessage={
          show && checkResult['name'].hasError
            ? checkResult['name'].errorMessage
            : ''
        }
      />

      <ShowIf show={isPrimary(formValue)}>
        {/* <CRTextInput
          label="Phone no"
          name="phoneNo"
          errorMessage={
            show && checkResult['phoneNo'].hasError
              ? checkResult['phoneNo'].errorMessage
              : ''
          }
        /> */}
        <CRLabel>Phone No</CRLabel>
        <PhoneInput
          country={'eg'}
          name="phoneNo"
          value={formValue.phoneNo}
          onChange={phone => onChange({ ...formValue, phoneNo: phone })}
          containerStyle={{ marginTop: '10px' }}
          inputStyle={{ width: '100%', borderRadius: '0px' }}
          defaultErrorMessage={
            show && checkResult['phoneNo'].hasError
              ? checkResult['phoneNo'].errorMessage
              : ''
          }
        />
      </ShowIf>

      <ShowIf show={isSecondary(formValue)}>
        <CRTextInput label="Guardian's Name" name="guardianName" />
        <CRTextInput label="Guardian's Phone No" name="phoneNo" />
      </ShowIf>

      <CRNumberInput
        label="Age"
        name="age"
        errorMessage={
          show && checkResult['age'].hasError
            ? checkResult['age'].errorMessage
            : ''
        }
      />

      <CRDatePicker label="Birth of Date" block name="date" />

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
