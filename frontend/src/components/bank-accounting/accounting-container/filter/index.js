import React from 'react';
import { Div } from 'components';
import { Form } from 'rsuite';
import { CRSelectInput } from 'components/widgets';
const AccountingFilter = ({ formValue, setFormValue,banksDefinition }) => {
  
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
            onChange={val =>
              val == null ? setFormValue({ bank: '' }) : setFormValue({ bank: val })
            }
            placeholder="Search"
            style={{ width: '230px' }}
          />
        </Div>
      </Div>
    </Form>
  );
};

export default AccountingFilter;
