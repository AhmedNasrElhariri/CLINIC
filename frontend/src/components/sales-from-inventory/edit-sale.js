import { Form } from 'rsuite';

import { CRNumberInput, CRSelectInput } from 'components/widgets';
import { useTranslation } from 'react-i18next';

function EditSale({ formValue, setFormValue }) {
  const saleOptions = [
    { id: 'saleByUnit', name: 'Sale By Unit' },
    { id: 'saleByBox', name: 'Sale By Box' },
  ];
  const { t } = useTranslation();

  return (
    <Form fluid formValue={formValue} onChange={setFormValue}>
      <CRSelectInput name="saleOption" data={saleOptions} block disabled />
      <CRNumberInput label={t('numberOfUnits')} name="quantity" />
      <CRNumberInput label={t('totalPrice')} name="totalPrice" size="md" />
    </Form>
  );
}

EditSale.defaultProps = {
  sessions: [],
};

export default EditSale;
