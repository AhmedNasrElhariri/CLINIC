import React from 'react';
import { Div } from 'components';
import { Form } from 'rsuite';
import { CRSelectInput, CRTextInput } from 'components/widgets';
import { useExpenseTypeDefinition } from 'hooks';
import { useTranslation } from 'react-i18next';

const AccountingFilter = ({ formValue, setFormValue }) => {
  const { t } = useTranslation();
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
      style={{ marginBottom: 64 }}
      formValue={formValue}
      onChange={setFormValue}
    >
      <Div mr={3} display="flex">
        <CRSelectInput
          label={t('expenseType')}
          name="expenseType"
          data={updatedExpenseTypeDefinitions}
          onChange={val =>
            val == null ? setFormValue({ ...formValue, expenseType: '' }) : ''
          }
          placeholder="Search"
          style={{ width: '230px', marginRight: '20px' }}
        />
        <CRTextInput
          label={t('expenseName')}
          name="expenseName"
          style={{ width: '230px' }}
        />
      </Div>
    </Form>
  );
};

export default AccountingFilter;
