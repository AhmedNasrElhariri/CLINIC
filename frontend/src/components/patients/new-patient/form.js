import React, { useEffect } from 'react';
import { Form } from 'rsuite';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useTranslation } from 'react-i18next';
import {
  CRSelectInput,
  CRTextInput,
  CRNumberInput,
  CRDatePicker,
  ShowIf,
  CRCheckBoxGroup,
  Div,
  CRLabel,
  CRRadio,
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
const ageOptions = [
  { name: 'Age', value: 'age' },
  { name: 'Birth Of Date', value: 'birthOfDate' },
];

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
  const { t } = useTranslation();
  useEffect(() => {
    if (formValue.date) {
      const years = moment().diff(formValue.date, 'years');
      onChange({ ...formValue, age: years });
    }
  }, [formValue.date]);
  return (
    <Form fluid formValue={formValue} onChange={onChange}>
      <CRSelectInput
        label={t('membershipType')}
        valueKey="value"
        name="type"
        data={membershipTypes}
        block
      />
      <CRTextInput
        label={t('patient')}
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
        <CRLabel>{t('phoneNo')}</CRLabel>
        <PhoneInput
          country={'eg'}
          name="phoneNo"
          value={formValue.phoneNo}
          enableSearch
          onChange={phone => onChange({ ...formValue, phoneNo: phone })}
          containerStyle={{ marginTop: '10px' }}
          inputStyle={{ width: '100%', borderRadius: '0px' }}
          // isValid={(value, country) => {
          //   if (!value.match(/^(01(0|1|2|5)\d{8})$/) && show) {
          //     return 'Invalid value: ' + value + ', ' + country.name;
          //   } else {
          //     return true;
          //   }
          // }}
          // errorMessage={
          //   show && checkResult['phoneNo'].hasError
          //     ? checkResult['phoneNo'].errorMessage
          //     : ''
          // }
        />
      </ShowIf>

      <ShowIf show={isSecondary(formValue)}>
        <CRTextInput label="Guardian's Name" name="guardianName" />
        <CRTextInput label="Guardian's Phone No" name="phoneNo" />
      </ShowIf>
      <CRRadio options={ageOptions} name="ageOption" />
      {formValue.ageOption === 'age' && (
        <CRNumberInput
          label={t('age')}
          name="age"
          errorMessage={
            show && checkResult['age'].hasError
              ? checkResult['age'].errorMessage
              : ''
          }
        />
      )}

      {formValue.ageOption === 'birthOfDate' && (
        <CRDatePicker label={t('birthOfDate')} block name="date" />
      )}

      <CRSelectInput
        label={t('type')}
        name="sex"
        valueKey="value"
        searchable={false}
        data={SEX}
        block
      />
      <CRSelectInput label={t('area')} name="area" data={newAreas} block />
      <CRCheckBoxGroup
        label={t('reference')}
        options={options}
        value={formValue.reference}
        onChange={val => onChange({ ...formValue, reference: val })}
        inline
      />
    </Form>
  );
};

export default NewPatient;
