import React, { useCallback, useMemo, useState } from 'react';
import * as R from 'ramda';
import { Form, Schema } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import { Div, CRNumberInput } from 'components';
import ListInvoiceItems from './list-invoice-items';
import { useForm, useInventory } from 'hooks';
import { CRButton, CRBrancheTree, CRDocSelectInput } from 'components/widgets';
import { normalize } from 'utils/misc';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  itemId: StringType().isRequired('Item is required'),
  quantity: NumberType().isRequired('Amount Type is required'),
});

const initValue = {
  itemId: null,
  quantity: 1,
  branchId: null,
  specialtyId: null,
  userId: null,
};

function InventoryUsage({ onChange, selectedItems, setSelectedItems }) {
  const { formValue, setFormValue } = useForm({
    initValue,
    model,
  });
  const { items, inventoryWithAmount } = useInventory();
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
        action={ACTIONS.AddItem_Inventory}
      />
      <Div display="flex" padding={30}>
        <Div width={396} mr={30}>
          <CRDocSelectInput
            label="Item"
            name="itemId"
            specialtyId={formValue?.specialtyId}
            branchId={formValue?.branchId}
            userId={formValue?.userId}
            data={itemsChoices}
            placement="topStart"
            block
          ></CRDocSelectInput>
        </Div>
        <Div width={200}>
          <CRNumberInput name="quantity" label="Quantity" name="quantity" />
        </Div>
        <CRButton variant="primary" onClick={handleAdd}>
          add
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
