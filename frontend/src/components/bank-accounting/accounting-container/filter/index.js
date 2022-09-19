import React from 'react';
import { Form } from 'rsuite';
import { CRSelectInput, CRTextInput, Div } from 'components/widgets';
import { useTranslation } from 'react-i18next';

const AccountingFilter = ({ formValue, setFormValue, banksDefinition }) => {
  const { t } = useTranslation();
  return (
    <Form
      style={{ marginBottom: 64 }}
      formValue={formValue}
      onChange={setFormValue}
    >
      <Div display="flex">
        <Div mr={3} ml={3}>
          <CRSelectInput
            label={t('bank')}
            name="bank"
            data={banksDefinition}
            placeholder="Search"
            style={{ width: '230px' }}
          />
        </Div>
        <CRTextInput
          label={t('revenueName')}
          name="revenueName"
          style={{ width: '230px' }}
        />
      </Div>
    </Form>
  );
};

export default AccountingFilter;
