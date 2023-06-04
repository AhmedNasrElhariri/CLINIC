import { CRModal } from 'components';
import { useCallback } from 'react';
import SaleItem from './form';
import EditSale from './edit-sale';
import { useInventory } from 'hooks';
import { useMemo } from 'react';
import * as R from 'ramda';

const ConsumeItems = ({
  setSelectedItems,
  close,
  selectedItems,
  formValue,
  visible,
  consumeInventoryManual,
  t,
  setFormValue,
  isSelling,
  type,
}) => {
  const { inventoryWithAmount } = useInventory({});
  const handleOk = useCallback(() => {
    if (type === 'create') {
      const { branchId, specialtyId, userId } = formValue;
      const data = {
        items: selectedItems,
        branchId,
        specialtyId,
        userId,
        isSelling,
      };
      consumeInventoryManual(data);
    }
  }, [formValue, consumeInventoryManual, selectedItems, isSelling, type]);

  const itemsChoices = useMemo(() => {
    const selectedItemIds = R.map(R.prop('itemId'))(selectedItems);
    return isSelling
      ? inventoryWithAmount.filter(
          f => !selectedItemIds.includes(f.id) && f?.item.sellable
        )
      : inventoryWithAmount.filter(f => !selectedItemIds.includes(f.id));
  }, [selectedItems, inventoryWithAmount, isSelling]);

  return (
    <CRModal
      show={visible}
      header={type === 'create' ? t('sellItem') : t('reconciliate')}
      onOk={handleOk}
      onHide={() => {
        close();
        setSelectedItems([]);
      }}
      onCancel={() => {
        close();
        setSelectedItems([]);
      }}
      width={850}
      height={480}
      bodyStyle={{ paddingLeft: 47, paddingRight: 47, margin: 0 }}
    >
      {type === 'create' && (
        <SaleItem
          selectedItems={selectedItems}
          setSelectedItems={setSelectedItems}
          formValue={formValue}
          setFormValue={setFormValue}
          isSelling={isSelling}
          inventoryWithAmount={inventoryWithAmount}
          itemsChoices={itemsChoices}
        />
      )}
      {type === 'edit' && (
        <EditSale formValue={formValue} setFormValue={setFormValue} />
      )}
    </CRModal>
  );
};
export default ConsumeItems;
