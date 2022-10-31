import React from 'react';
import { CRTextInput } from 'components';
import { Form } from 'rsuite';
const Filter = ({ formValue, onChange, t }) => {
  return (
    <>
      <Form formValue={formValue} onChange={onChange}>
        <CRTextInput
          label={t('invoiceName')}
          name="name"
          style={{ width: 256 }}
        />
      </Form>
    </>
  );
};
export default Filter;
