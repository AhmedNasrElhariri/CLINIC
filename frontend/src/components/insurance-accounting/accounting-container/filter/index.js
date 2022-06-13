import React from 'react';
import { Div } from 'components';
import { Form } from 'rsuite';
import { CRSelectInput } from 'components/widgets';
import { useCompanyDefinition } from 'hooks';
import { useTranslation } from 'react-i18next';

const AccountingFilter = ({ formValue, setFormValue }) => {
  const { t } = useTranslation();
  const { companysDefinition } = useCompanyDefinition({});
  const updatedCompanysDefinitions = companysDefinition.map(c => {
    return {
      id: c.name,
      name: c.name,
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
            label={t('companyName')}
            name="company"
            data={updatedCompanysDefinitions}
            onChange={val =>
              val == null
                ? setFormValue({ company: '' })
                : setFormValue({ company: val })
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
