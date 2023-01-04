import React from 'react';
import { Div } from 'components';
import { Form } from 'rsuite';
import { CRSelectInput } from 'components/widgets';
import { useCompanyDefinition } from 'hooks';
import { useTranslation } from 'react-i18next';
import { feesStatus } from 'utils/constants';

const AccountingFilter = ({ formValue, setFormValue }) => {
  const { t } = useTranslation();
  const { companysDefinition } = useCompanyDefinition({});

  return (
    <Form
      style={{ width: 276, marginBottom: 64 }}
      formValue={formValue}
      onChange={setFormValue}
    >
      <Div display="flex">
        <Div mr={2}>
          <CRSelectInput
            label={t('companyName')}
            name="company"
            data={companysDefinition}
            labelKey="name"
            valueKey="id"
            placeholder="Search"
            style={{ width: '230px' }}
          />
        </Div>
        <CRSelectInput
          label={t('status')}
          name="status"
          labelKey="name"
          valueKey="value"
          block
          data={feesStatus}
          style={{ width: '200px', marginRight: '20px' }}
        />
      </Div>
    </Form>
  );
};

export default AccountingFilter;
