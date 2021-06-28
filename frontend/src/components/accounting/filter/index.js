import React from 'react';
import { Div } from 'components';
import { Form } from 'rsuite';
import { CRSelectInput } from 'components/widgets';
import { useExpenseTypeDefinition } from 'hooks';
const AccountingFilter = ({ formValue, setFormValue }) => {
  const { expenseTypesDefinition } = useExpenseTypeDefinition({});
  const updatedExpenseTypeDefinitions = expenseTypesDefinition.map(b => {
    return {
      id: b.name,
      name: b.name,
    };
  });
  const salary = { id: 'Salary', name: 'Salary' };
  updatedExpenseTypeDefinitions.push(salary);
  return (
    <Form
      style={{ width: 276, marginBottom: 64 }}
      formValue={formValue}
      onChange={setFormValue}
    >
      <Div display="flex">
        <Div mr={3}>
          <CRSelectInput
            label="Expense Type"
            name="expenseType"
            data={updatedExpenseTypeDefinitions}
            onChange={val => val == null ? setFormValue({...formValue,expenseType:''}):''}
            placeholder="Search"
            style={{ width: '230px' }}
          />
        </Div>
      </Div>
    </Form>
  );
};

export default AccountingFilter;
