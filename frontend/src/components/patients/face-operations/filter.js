import React from 'react';
import { Div, CRTextInput, CRDateRangePicker } from 'components';
import { Form } from 'rsuite';
const Filter = ({ formValue, setFormValue }) => {
  return (
    <Form formValue={formValue} onChange={setFormValue}>
      <Div display="flex">
        <CRTextInput
          label="Partation Name"
          name="name"
          style={{ width: '230px', marginRight: '20px' }}
        />
        <CRDateRangePicker
          name="date"
          label="Range"
          placeholder="Timeframe"
          style={{ width: '230px' }}
        />
      </Div>
    </Form>
  );
};

export default Filter;
