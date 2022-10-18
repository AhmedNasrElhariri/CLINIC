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
    <Form formValue={formValue} onChange={setFormValue}>
      <div className="flex flex-wrap gap-3">
        <CRSelectInput
          label={t('expenseType')}
          name="expenseType"
          data={updatedExpenseTypeDefinitions}
          onChange={val =>
            val == null ? setFormValue({ ...formValue, expenseType: '' }) : ''
          }
          placeholder="Search"
          className="w-56"
        />
        <CRTextInput label={t('expenseName')} name="expenseName" />
      </div>
    </Form>
  );
};

export default AccountingFilter;
