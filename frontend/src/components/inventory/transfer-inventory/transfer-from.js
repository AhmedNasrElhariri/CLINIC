import {
  Div,
  CRBrancheTree,
  CRNumberInput,
  CRDocSelectInput,
  CRSelectWithOrganization,
} from 'components';
import { ACTIONS } from 'utils/constants';
import { Form } from 'rsuite';
import { useInventory } from 'hooks';
import { useCallback } from 'react';
const TransferFrom = ({ t, formValue, onChange }) => {
  const { inventoryWithAmount } = useInventory();
  const handleChangeBoxOrUnits = useCallback(
    (value, type) => {
      const numberOfBoxes = formValue?.item?.quantity / formValue?.item?.amount;
      type === 'noOfUnits'
        ? onChange(prev => ({
            ...prev,
            quantity: value,
            noOfBoxes: value / numberOfBoxes,
          }))
        : onChange(prev => ({
            ...prev,
            noOfBoxes: value,
            quantity: value * numberOfBoxes,
          }));
    },
    [onChange, formValue?.item] // don't change these dependencies
  );
  return (
    <Div>
      <Div fontWeight="bold" mb="20px">
        Transfer from
      </Div>
      <Form fluid>
        <CRBrancheTree
          formValue={formValue}
          onChange={onChange}
          action={ACTIONS.AddCustom_Inventory}
          notAllowSpecialty
          notAllowUser
        />
        <CRSelectWithOrganization
          label={t('item')}
          specialtyId={formValue?.specialtyId}
          branchId={formValue?.branchId}
          userId={formValue?.userId}
          data={inventoryWithAmount}
          value={formValue?.item}
          onChange={val => onChange({ ...formValue, item: val })}
          placement="auto"
          block
        ></CRSelectWithOrganization>
        <div className="flex items-end gap-3 mb-5">
          <CRNumberInput
            label={t('numberOfBoxes')}
            value={formValue.noOfBoxes}
            onChange={val => handleChangeBoxOrUnits(val, 'numberOfBoxes')}
          />
          <CRNumberInput
            label={t('noOfUnits')}
            value={formValue.quantity}
            onChange={val => handleChangeBoxOrUnits(val, 'noOfUnits')}
          />
        </div>
      </Form>
    </Div>
  );
};
export default TransferFrom;
