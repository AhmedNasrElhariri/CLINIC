import React from 'react';
import { CRSelectInput, CRNumberInput, Div } from 'components';
import { Form } from 'rsuite';
import { useTranslation } from 'react-i18next';

const types = [
  { id: 'prescription', name: 'Prescription' },
  { id: 'reportPrintout', name: 'ReportPrintout' },
  { id: 'sales', name: 'Sales' },
];
const PageSetup = ({ pageSetup, setPageSetup }) => {
  const { t } = useTranslation();
  return (
    <Form formValue={pageSetup} onChange={setPageSetup}>
      <CRSelectInput
        data={types}
        label={t('type')}
        name="type"
        block
        placement="top"
        style={{ width: '300px', marginBottom: '50px' }}
      />
      <Div display="flex" justifyContent="space-between">
        <CRNumberInput
          name="top"
          label={t('top')}
          layout="inline"
          placeholder="By Centimeter"
        />
        <CRNumberInput
          name="right"
          label={t('right')}
          layout="inline"
          placeholder="By Centimeter"
        />
        <CRNumberInput
          name="bottom"
          label={t('bottom')}
          layout="inline"
          placeholder="By Centimeter"
        />
        <CRNumberInput
          name="left"
          label={t('left')}
          layout="inline"
          placeholder="By Centimeter"
        />
      </Div>
    </Form>
  );
};

export default PageSetup;
