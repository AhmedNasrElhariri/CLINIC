import { Div, CRTextInput, CRSelectInput } from 'components';
import { Form } from 'rsuite';
import { useTranslation } from 'react-i18next';
import { ORDERBYOPTIONS } from 'utils/constants';

const AccountingFilter = ({ formValue, setFormValue }) => {
  const { t } = useTranslation();
  return (
    <Form
      style={{ marginBottom: 64 }}
      formValue={formValue}
      onChange={setFormValue}
    >
      <Div display="flex">
        <CRTextInput label={t('revenueName')} name="revenueName" />
        <CRSelectInput
          label={t('orderBy')}
          data={ORDERBYOPTIONS}
          name="orderByOption"
          block
          className="w-64 mx-4"
        />
      </Div>
    </Form>
  );
};

export default AccountingFilter;
