import React, { useCallback, useMemo } from 'react';
import * as R from 'ramda';
import { Form } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import { Div, CRNumberInput } from 'components';
import ListInvoiceItems from './list-invoice-items';
import { useInventory } from 'hooks';
import { CRButton, CRBrancheTree, CRDocSelectInput } from 'components/widgets';
import { normalize } from 'utils/misc';
import { useTranslation } from 'react-i18next';

const initValue = {
  itemId: null,
  quantity: 1,
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
  const { items, inventoryWithAmount } = useInventory();
  const { t } = useTranslation();
  const handleDelete = useCallback(
    idx => {
      const newItems = R.remove(idx, 1)(selectedItems);
      setSelectedItems(newItems);
      onChange(newItems);
    },
    [onChange, selectedItems]
  );

  const handleAdd = useCallback(() => {
    const itemId = formValue?.itemId.id;
    const quantity = formValue?.quantity;
    const newItems = [...selectedItems, { itemId: itemId, quantity: quantity }];
    setSelectedItems(newItems);
    setFormValue(initValue);
    onChange(newItems);
  }, [onChange, formValue, selectedItems]);

  const itemsChoices = useMemo(() => {
    const selectedItemIds = R.map(R.prop('itemId'))(selectedItems);

    return inventoryWithAmount.filter(f => !selectedItemIds.includes(f.id));
  }, [selectedItems]);
  const itemsList = useMemo(() => {
    const byIds = normalize(inventoryWithAmount);
    return selectedItems.map(({ itemId, quantity }) => ({
      ...byIds[itemId],
      Quantity: quantity,
    }));
  }, [selectedItems]);
  return (
    <Form fluid formValue={formValue} onChange={setFormValue}>
      <CRBrancheTree
        formValue={formValue}
        onChange={setFormValue}
        action={ACTIONS.AddCustom_Inventory}
      />
      <Div display="flex" padding={30}>
        <Div width={396} mr={30}>
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
        </Div>
        <Div width={200}>
          <CRNumberInput
            name="quantity"
            label={t('quantity')}
            name="quantity"
          />
        </Div>
        <CRButton variant="primary" onClick={handleAdd}>
          {t('add')}
        </CRButton>
      </Div>
      <ListInvoiceItems items={itemsList} onDelete={handleDelete} />
    </Form>
  );
}

InventoryUsage.defaultProps = {
  sessions: [],
};

export default InventoryUsage;
