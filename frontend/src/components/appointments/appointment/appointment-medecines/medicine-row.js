import React from 'react';
import { FlexboxGrid, Form } from 'rsuite';

import { MedicineContainerStyled, BoxStyled } from './style';
import { CRButton, Div, H6, H7 } from 'components';
import { CRNumberInput, CRSelectInput, CRTextInput } from 'components/widgets';
import { useTranslation } from 'react-i18next';

const peridos = [
  { name: 'Year', id: 'year', arbiceValue: 'سنة', englishValue: 'year' },
  { name: 'Month', id: 'month', arbiceValue: 'شهر', englishValue: 'month' },
  { name: 'Week', id: 'week', arbiceValue: 'أسبوع', englishValue: 'week' },
  { name: 'Day', id: 'day', arbiceValue: 'يوم', englishValue: 'day' },
];
const MedicineRow = ({ timings, medicine, formValue, onChange, onClick }) => {
  const { name, concentration, form } = medicine;
  const required = formValue.required;
  const { t } = useTranslation();

  return (
    <Form
      fluid
      formValue={formValue}
      onChange={onChange}
      className="flex flex-row flex-nowrap items-center gap-3 mt-4 sm:bg-white p-2"
    >
      <Div className="flex items-center w-24 flex-wrap">
        <H6 fontWeight="bold">{name}</H6>
        <H6 mx={1}>({form})</H6>
        <H7 fontStyle="italic">{concentration}</H7>
      </Div>
      <Div className="flex-grow">
        <CRTextInput
          noLabel
          name="dose"
          placeholder={t('dose')}
          disabled={required}
        />
      </Div>
      {/* <CRSelectInput
        noLabel
        className="min-w-[10rem]"
        name="timingId"
        data={timings}
        disabled={required}
      />
      <CRNumberInput
        noLabel
        name="duration"
        placeholder={t('duration')}
        disabled={required}
        style={{ width: '100px' }}
      />
      <CRSelectInput
        noLabel
        placeholder="Period"
        name="period"
        data={peridos}
        disabled={required}
        className="min-w-[10rem]"
      /> */}
      <CRButton
        className="min-w-[5rem] "
        variant={required ? 'dark' : 'primary'}
        p={10}
        onClick={onClick}
      >
        {required ? t('required') : t('require')}
      </CRButton>
    </Form>
  );
};

export default MedicineRow;
