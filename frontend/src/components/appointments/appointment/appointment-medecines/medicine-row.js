import React from 'react';
import { FlexboxGrid, Form } from 'rsuite';

import { CRButton, Div, H6, H7 } from 'components';
import { CRNumberInput, CRSelectInput, CRTextInput } from 'components/widgets';
import { useTranslation } from 'react-i18next';
import { createDescription } from 'services/medicine.service';

const peridos = [
  { name: 'Year', id: 'year', arbiceValue: 'سنة', englishValue: 'year' },
  { name: 'Month', id: 'month', arbiceValue: 'شهر', englishValue: 'month' },
  { name: 'Week', id: 'week', arbiceValue: 'أسبوع', englishValue: 'week' },
  { name: 'Day', id: 'day', arbiceValue: 'يوم', englishValue: 'day' },
];
const MedicineRow = ({ medicine, formValue, onChange, onClick }) => {
  const required = formValue.required;
  const { t } = useTranslation();

  return (
    <Form
      fluid
      formValue={formValue}
      onChange={onChange}
      className="flex flex-row flex-nowrap items-center gap-3 mt-4 sm:bg-white p-2"
    >
      <Div className="flex items-center w-40 flex-wrap">
        <H6 fontWeight="bold">{createDescription(medicine)}</H6>
      </Div>
      <Div className="flex-grow">
        <CRTextInput
          noLabel
          name="dose"
          placeholder={t('dose')}
          disabled={required}
        />
      </Div>
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
