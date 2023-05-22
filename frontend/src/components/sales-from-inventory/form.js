import { useCallback, useEffect, useMemo } from 'react';
import * as R from 'ramda';
import { Form } from 'rsuite';
import { ACTIONS } from 'utils/constants';
import ListInvoiceItems from './list-items';
import { useInventory } from 'hooks';
import {
  CRButton,
  CRBrancheTree,
  CRDocSelectInput,
  CRNumberInput,
  CRSelectInput,
  Div,
} from 'components/widgets';
import { normalize } from 'utils/misc';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const TotalDiv = styled.div`
  border: 1px solid;
  height: 35px;
  display: flex;
  text-align: center;
  align-items: center;
  padding: 0px 20px;
  font-weight: bold;
`;
const initValue = {
  itemId: null,
  quantity: 1,
  branchId: null,
  specialtyId: null,
  userId: null,
  saleOption: 'saleByUnit',
  pricePerUnit: 0,
  numberOfBoxes: 1,
  pricePerBox: 0,
};

function InventoryUsage({
  selectedItems,
  setSelectedItems,
  formValue,
  setFormValue,
  isSelling,
}) {
  const { inventoryWithAmount } = useInventory();
  const saleOptions = [
    { id: 'saleByUnit', name: 'Sale By Unit' },
    { id: 'saleByBox', name: 'Sale By Box' },
  ];
  const { t } = useTranslation();
  const handleDelete = useCallback(
    idx => {
      const newItems = R.remove(idx, 1)(selectedItems);
      setSelectedItems(newItems);
    },
    [selectedItems, setSelectedItems]
  );
  const total = useMemo(() => {
    return selectedItems.reduce((acc, { pricePerBox }) => pricePerBox + acc, 0);
  }, [selectedItems]);

  const handleAdd = useCallback(() => {
    const itemId = formValue?.itemId.id;
    const option = formValue?.saleOption;
    const quantity =
      option === 'saleByBox'
        ? parseFloat(formValue?.numberOfBoxes * formValue?.itemId?.quantity)
        : parseFloat(formValue?.quantity);
    const sellingPricePerBox =
      option === 'saleByBox'
        ? formValue.pricePerBox
        : formValue.pricePerUnit * quantity;
    const sellingPricePerUnit =
      option === 'saleByUnit'
        ? formValue?.pricePerUnit
        : formValue?.pricePerBox / quantity;
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
  }, [formValue, selectedItems, setFormValue, setSelectedItems]);

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

  useEffect(() => {
    const pricePerUnit = formValue?.itemId?.item?.sellingPricePerUnit;
    const quantity = formValue?.itemId?.item?.quantity;
    setFormValue(prev => ({
      ...prev,
      pricePerBox: pricePerUnit * quantity,
      pricePerUnit: pricePerUnit,
    }));
  }, [setFormValue, formValue?.itemId]);

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
      <CRSelectInput name="saleOption" data={saleOptions} block />
      {formValue?.saleOption === 'saleByUnit' ? (
        <div className="flex items-end gap-3 mb-5">
          <CRNumberInput label={t('noOfUnits')} name="quantity" />
          <CRNumberInput
            label={t('pricePerUnit')}
            name="pricePerUnit"
            size="md"
          />
          <CRButton variant="primary" onClick={handleAdd}>
            {t('add')}
          </CRButton>
          <TotalDiv>Total:{total}</TotalDiv>
        </div>
      ) : (
        <div className="flex items-end gap-3 mb-5">
          <CRNumberInput label={t('numberOfBoxes')} name="numberOfBoxes" />
          <CRNumberInput
            label={t('pricePerBox')}
            name="pricePerBox"
            size="md"
          />
          <CRButton variant="primary" onClick={handleAdd}>
            {t('add')}
          </CRButton>
          <TotalDiv>Total:{total}</TotalDiv>
        </div>
      )}

      <ListInvoiceItems
        items={itemsList}
        onDelete={handleDelete}
        formValue={selectedItems}
        onChange={setSelectedItems}
        t={t}
      />
    </Form>
  );
}

InventoryUsage.defaultProps = {
  sessions: [],
};

export default InventoryUsage;
