import React from 'react';
import { CRTextInput, Div } from 'components';
import { Form } from 'rsuite';
const Filter = ({ formValue, onChange, t }) => {
  return (
    <>
      <Form formValue={formValue} onChange={onChange}>
        <Div display="flex" mb="20px">
          <CRTextInput
            label={t('invoiceName')}
            name="name"
            style={{ width: '230px', marginRight: '20px' }}
          />
        </Div>
      </Form>
    </>
  );
};
export default Filter;
