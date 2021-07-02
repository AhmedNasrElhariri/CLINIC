import React from 'react';
import { Div, CRTextInput } from 'components';
import { Form } from 'rsuite';
const AccountingFilter = ({ formValue, setFormValue }) => {
  return (
    <Form
      style={{ width: 276, marginBottom: 64 }}
      formValue={formValue}
      onChange={setFormValue}
    >
      <Div display="flex">
        <Div mr={3}>
          <CRTextInput
            label="Revenue Name"
            name="revenueName"
            style={{ width: '230px' }}
          />
        </Div>
      </Div>
    </Form>
  );
};

export default AccountingFilter;
