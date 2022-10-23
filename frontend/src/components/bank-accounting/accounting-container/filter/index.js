import React from 'react';
import { Form } from 'rsuite';
import { CRSelectInput, CRTextInput, Div } from 'components/widgets';
import { useTranslation } from 'react-i18next';

const AccountingFilter = ({ formValue, setFormValue, banksDefinition }) => {
  const { t } = useTranslation();
  return (
    <Form
      className="flex flex-wrap gap-3"
      formValue={formValue}
      onChange={setFormValue}
    >
      <CRSelectInput
        label={t('bank')}
        name="bank"
        data={banksDefinition}
        placeholder="Search"
        style={{ width: '230px' }}
      />
      <CRTextInput
        label={t('revenueName')}
        name="revenueName"
        style={{ width: '230px' }}
      />
    </Form>
  );
};

export default AccountingFilter;
