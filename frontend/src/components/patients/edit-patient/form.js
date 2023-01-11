import { Form, Schema } from 'rsuite';
import {
  CRSelectInput,
  CRTextInput,
  CRNumberInput,
  ShowIf,
  CRCheckBoxGroup,
  CRTextArea,
  CRDatePicker
} from 'components';

const membershipTypes = [
  { name: 'Primary', id: 'Primary' },
  { name: 'Secondary', id: 'Secondary' },
];

const SEX = ['Male', 'Female'].map(s => ({
  name: s,
  id: s,
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

const patientLevel = [
  { name: 'VIP', value: 'VIP' },
  { name: 'Normal', value: 'Normal' },
];

const maritalStatus = [
  { name: 'Married', value: 'Married' },
  { name: 'Single', value: 'Single' },
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

const NewPatient = ({ formValue, onChange, t, newAreas, branches }) => {
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
        label={t('branch')}
        name="branchId"
        valueKey="id"
        searchable={false}
        data={branches}
        block
      />
      <CRSelectInput
        label={t('sex')}
        name="sex"
        searchable={false}
        data={SEX}
        block
      />
      <CRTextInput label={t('email')} name="email" />
      <CRSelectInput
        label={t('maritalStatus')}
        name="maritalStatus"
        valueKey="value"
        searchable={false}
        data={maritalStatus}
        block
      />
      <CRSelectInput
        label={t('patientLevel')}
        name="patientLevel"
        valueKey="value"
        searchable={false}
        data={patientLevel}
        block
      />
      <CRSelectInput label={t('area')} name="area" data={newAreas} block />
      <CRTextInput label={t('patientId')} name="patientId" />
      <CRCheckBoxGroup
        label={t('reference')}
        options={options}
        value={formValue.reference}
        onChange={val => onChange({ ...formValue, reference: val })}
        inline
      />
      <CRTextArea name="notes" label="Notes" />
      <CRTextInput label={t('cardId')} name="cardId" block />
      <CRDatePicker label={t('cardExpiryDate')} name="cardExpiryDate" block />
    </Form>
  );
};

export default NewPatient;
