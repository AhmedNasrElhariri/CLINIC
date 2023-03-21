import React, { useCallback, useMemo } from 'react';
import * as R from 'ramda';
import { Form, InputNumber } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import ListInvoiceItems from './list-invoice-items';
import { useInventory } from 'hooks';
import {
  CRButton,
  CRBrancheTree,
  CRDocSelectInput,
  CRLabel,
} from 'components/widgets';
import { normalize } from 'utils/misc';
import { useTranslation } from 'react-i18next';

const initValue = {
  itemId: null,
  quantity: 0,
  branchId: null,
  specialtyId: null,
  userId: null,
};

function InventoryUsage({
  onChange,
  selectedItems,
  setSelectedItems,
  formValue,
  setFormValue,
}) {
  const { inventoryWithAmount } = useInventory();
  const { t } = useTranslation();
  const handleDelete = useCallback(
    idx => {
      const newItems = R.remove(idx, 1)(selectedItems);
      setSelectedItems(newItems);
      onChange(newItems);
    },
    [onChange, selectedItems, setSelectedItems]
  );

  const handleAdd = useCallback(() => {
    const itemId = formValue?.itemId.id;
    const quantity = parseFloat(formValue?.quantity);
    const newItems = [...selectedItems, { itemId: itemId, quantity: quantity }];
    setSelectedItems(newItems);
    setFormValue(initValue);
    onChange(newItems);
  }, [onChange, formValue, selectedItems, setFormValue, setSelectedItems]);

  const itemsChoices = useMemo(() => {
    const selectedItemIds = R.map(R.prop('itemId'))(selectedItems);

    return inventoryWithAmount.filter(f => !selectedItemIds.includes(f.id));
  }, [selectedItems, inventoryWithAmount]);
  const itemsList = useMemo(() => {
    const byIds = normalize(inventoryWithAmount);
    return selectedItems.map(({ itemId, quantity }) => ({
      ...byIds[itemId],
      Quantity: quantity,
    }));
  }, [selectedItems, inventoryWithAmount]);
  return (
    <Form fluid formValue={formValue} onChange={setFormValue}>
      <CRBrancheTree
        formValue={formValue}
        onChange={setFormValue}
        action={ACTIONS.AddCustom_Inventory}
        notAllowSpecialty
        notAllowUser
      />
      <CRDocSelectInput
        label={t('item')}
        name="itemId"
        specialtyId={formValue?.specialtyId}
        branchId={formValue?.branchId}
        userId={formValue?.userId}
        data={itemsChoices}
        placement="auto"
        block
      ></CRDocSelectInput>
      <div className="flex items-end gap-3 mb-5">
        <CRLabel style={{ margin: '0px', width: '120px' }}>
          {t('noOfUnits')}
        </CRLabel>
        <InputNumber
          value={formValue.quantity}
          onChange={val => {
            setFormValue({ ...formValue, quantity: val });
          }}
        />
        <CRButton variant="primary" onClick={handleAdd}>
          {t('add')}
        </CRButton>
      </div>
      <ListInvoiceItems items={itemsList} onDelete={handleDelete} />
    </Form>
  );
}

InventoryUsage.defaultProps = {
  sessions: [],
};

export default InventoryUsage;
