import {
  Div,
  CRBrancheTree,
  CRNumberInput,
  CRDocSelectInput,
} from 'components';
import { ACTIONS } from 'utils/constants';
import { Form } from 'rsuite';
import { useInventory } from 'hooks';
const TransferFrom = ({ t, formValue, onChange }) => {
  const { inventoryWithAmount } = useInventory();
  return (
    <Div>
      <Div>Transfer from</Div>
      <Form fluid>
        <CRBrancheTree
          formValue={formValue}
          onChange={onChange}
          action={ACTIONS.AddCustom_Inventory}
          notAllowSpecialty
          notAllowUser
        />
        <CRDocSelectInput
          label={t('item')}
          specialtyId={formValue?.specialtyId}
          branchId={formValue?.branchId}
          userId={formValue?.userId}
          data={inventoryWithAmount}
          value={formValue?.item}
          onChange={val => onChange({ ...formValue, item: val })}
          placement="auto"
          block
        ></CRDocSelectInput>
        <CRNumberInput
          label={t('quantity')}
          value={formValue?.quantity}
          onChange={val => onChange({ ...formValue, quantity: val })}
        />
      </Form>
    </Div>
  );
};
export default TransferFrom;
