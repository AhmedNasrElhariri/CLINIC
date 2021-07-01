import React from 'react';
import { Div } from 'components';
import { Form } from 'rsuite';
import { CRSelectInput } from 'components/widgets';
import { useBankDefinition } from 'hooks';
const AccountingFilter = ({ formValue, setFormValue }) => {
  const { banksDefinition } = useBankDefinition({});
  const updatedBankDefinitions = banksDefinition.map(b => {
    return {
      id: b.name,
      name: b.name,
    };
  });
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
            data={updatedBankDefinitions}
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
