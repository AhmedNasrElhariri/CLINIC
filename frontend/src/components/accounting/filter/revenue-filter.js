import React from 'react';
import { Div, CRTextInput } from 'components';
import { Form } from 'rsuite';
import { useTranslation } from 'react-i18next';

const AccountingFilter = ({ formValue, setFormValue }) => {
  const { t } = useTranslation();
  return (
    <Form
      style={{ width: 276, marginBottom: 64 }}
      formValue={formValue}
      onChange={setFormValue}
    >
      <Div display="flex">
        <Div mr={3}>
          <CRTextInput
            label={t('revenueName')}
            name="revenueName"
            style={{ width: '230px' }}
          />
        </Div>
      </Div>
    </Form>
  );
};

export default AccountingFilter;
