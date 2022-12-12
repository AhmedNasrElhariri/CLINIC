import React from 'react';
import { CRDateRangePicker, Div, CRSelectInput } from 'components';
import { Form } from 'rsuite';

const Filter = ({ formValue, setFormValue, t, users }) => {
  return (
    <Form
      style={{ marginBottom: 64 }}
      formValue={formValue}
      onChange={setFormValue}
    >
      <Div display="flex" flexWrap="wrap">
        <CRSelectInput
          label={t('user')}
          name="userId"
          placeholder={t('select')}
          block
          data={users}
          style={{ marginRight: '30px',width:'150px' }}
        />
        <CRDateRangePicker
          name="date"
          label="From - To"
          placeholder={t('timeframe')}
          size="sm"
          block
          small
          placement="auto"
          
        />
      </Div>
    </Form>
  );
};

export default Filter;
