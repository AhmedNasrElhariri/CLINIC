import React from 'react';
import { Form } from 'rsuite';
import { CRSelectInput, CRTextInput, Div } from 'components/widgets';
const AccountingFilter = ({ formValue, setFormValue, banksDefinition }) => {
  return (
    <Form
      style={{ width: 276, marginBottom: 64 }}
      formValue={formValue}
      onChange={setFormValue}
    >
      <Div display="flex">
        <Div mr={3}>
          <CRSelectInput
            label="Bank"
            name="bank"
            data={banksDefinition}
            placeholder="Search"
            style={{ width: '230px' }}
          />
        </Div>
        <CRTextInput
          label="Revenue Name"
          name="revenueName"
          style={{ width: '230px' }}
        />
      </Div>
    </Form>
  );
};

export default AccountingFilter;
