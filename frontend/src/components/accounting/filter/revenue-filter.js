import React from 'react';
import { Div, CRTextInput } from 'components';
import { Form } from 'rsuite';
import { useTranslation } from 'react-i18next';

const AccountingFilter = ({ formValue, setFormValue }) => {
  const { t } = useTranslation();
  return (
    <Form
      style={{ marginBottom: 64 }}
      formValue={formValue}
      onChange={setFormValue}
    >
      <Div width="270px">
        <CRTextInput
          label={t('revenueName')}
          name="revenueName"
        />
      </Div>
    </Form>
  );
};

export default AccountingFilter;
