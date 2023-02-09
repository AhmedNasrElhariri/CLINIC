import { Div, CRTextInput, CRSelectInput } from 'components';
import { Form } from 'rsuite';
import { ACCOUNTING_OPTIONS, TRANSATIONS_TYPES } from 'utils/constants';

const AccountingFilter = ({ formValue, setFormValue, t, banksDefinition }) => {
  return (
    <Form
      style={{ marginBottom: 64 }}
      formValue={formValue}
      onChange={setFormValue}
    >
      <Div display="flex">
        <CRTextInput label={t('name')} name="name" />
        <Div ml="10px">
          <CRSelectInput
            label={t('revenuesOrExpenses')}
            data={TRANSATIONS_TYPES}
            name="transactionType"
            block
            className="w-64"
            cleanable={false}
          />
        </Div>
        <Div ml="10px">
          <CRSelectInput
            label={t('cashOrVisa')}
            data={ACCOUNTING_OPTIONS}
            name="accountingOption"
            block
            className="w-64"
          />
        </Div>
        {formValue.accountingOption === 'visa' && (
          <Div ml="10px">
            <CRSelectInput
              label={t('bank')}
              name="bankId"
              data={banksDefinition}
              placeholder="Search"
              style={{ width: '230px' }}
            />
          </Div>
        )}
      </Div>
    </Form>
  );
};

export default AccountingFilter;
