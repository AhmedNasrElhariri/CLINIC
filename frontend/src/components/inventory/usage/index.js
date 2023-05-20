import React, { useCallback, useEffect, useMemo } from 'react';
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
  CRNumberInput,
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
  isSelling,
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
    const sellingPricePerBox = formValue?.itemId?.item?.sellingPricePerBox;
    const sellingPricePerUnit = formValue?.itemId?.item?.sellingPricePerUnit;
    const newItems = [
      ...selectedItems,
      {
        itemId: itemId,
        quantity: quantity,
        pricePerBox: sellingPricePerBox,
        pricePerUnit: sellingPricePerUnit,
      },
    ];
    setSelectedItems(newItems);
    setFormValue(initValue);
    onChange(newItems);
  }, [onChange, formValue, selectedItems, setFormValue, setSelectedItems]);

  const itemsChoices = useMemo(() => {
    const selectedItemIds = R.map(R.prop('itemId'))(selectedItems);
    return isSelling
      ? inventoryWithAmount.filter(
          f => !selectedItemIds.includes(f.id) && f?.item.sellable
        )
      : inventoryWithAmount.filter(f => !selectedItemIds.includes(f.id));
  }, [selectedItems, inventoryWithAmount, isSelling]);

  const itemsList = useMemo(() => {
    const byIds = normalize(inventoryWithAmount);
    return selectedItems.map(({ itemId, quantity }) => ({
      ...byIds[itemId],
      Quantity: quantity,
    }));
  }, [selectedItems, inventoryWithAmount]);

  const handleChangeBoxOrUnits = useCallback(
    (value, type) => {
      const numberOfBoxes =
        formValue?.itemId?.quantity / formValue?.itemId?.amount;
      type === 'noOfUnits'
        ? setFormValue({
            ...formValue,
            quantity: value,
            noOfBoxes: value / numberOfBoxes,
          })
        : setFormValue({
            ...formValue,
            noOfBoxes: value,
            quantity: value * numberOfBoxes,
          });
    },
    [setFormValue, formValue?.itemId] // don't change these dependencies
  );

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
        <CRNumberInput
          label={t('noOfUnits')}
          value={formValue.quantity}
          onChange={val => handleChangeBoxOrUnits(val, 'noOfUnits')}
        />
        <CRNumberInput
          label={t('numberOfBoxes')}
          value={formValue.noOfBoxes}
          onChange={val => handleChangeBoxOrUnits(val, 'numberOfBoxes')}
        />
        <CRButton variant="primary" onClick={handleAdd}>
          {t('add')}
        </CRButton>
      </div>
      <ListInvoiceItems
        items={itemsList}
        onDelete={handleDelete}
        formValue={selectedItems}
        onChange={setSelectedItems}
        isSelling={isSelling}
      />
    </Form>
  );
}

InventoryUsage.defaultProps = {
  sessions: [],
};

export default InventoryUsage;
