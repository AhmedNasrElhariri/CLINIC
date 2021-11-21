import React from 'react';
import { CRSelectInput, CRNumberInput, Div } from 'components';
import { Form } from 'rsuite';
const types = [
  { id: 'prescription', name: 'Prescription' },
  { id: 'reportPrintout', name: 'ReportPrintout' },
  { id: 'sales', name: 'Sales' },
];
const PageSetup = ({ pageSetup, setPageSetup }) => {
  return (
    <Form formValue={pageSetup} onChange={setPageSetup}>
      <CRSelectInput
        data={types}
        label="Type"
        name="type"
        block
        placement="top"
        style={{ width: '300px', marginBottom: '50px' }}
      />
      <Div display="flex" justifyContent="space-between">
        <CRNumberInput
          name="top"
          label="Top"
          layout="inline"
          placeholder="By Centimeter"
        />
        <CRNumberInput
          name="right"
          label="Right"
          layout="inline"
          placeholder="By Centimeter"
        />
        <CRNumberInput
          name="bottom"
          label="Bottom"
          layout="inline"
          placeholder="By Centimeter"
        />
        <CRNumberInput
          name="left"
          label="Left"
          layout="inline"
          placeholder="By Centimeter"
        />
      </Div>
    </Form>
  );
};

export default PageSetup;
