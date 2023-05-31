import { CRModal } from 'components';
import { useCallback } from 'react';
import SaleItem from './form';
import EditSale from './edit-sale';
import { useInventory } from 'hooks';
import ReconstructSales from './reconstruct';
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
  reconstructSales,
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
    } else {
      const { branchId, operation, quantity, itemId, noOfBoxes } = formValue;
      reconstructSales({
        variables: {
          sales: {
            branchId,
            operation,
            numberOfUnits: quantity,
            itemId: itemId.id,
            noOfBoxes,
          },
        },
      });
    }
  }, [
    formValue,
    consumeInventoryManual,
    selectedItems,
    isSelling,
    type,
    reconstructSales,
  ]);
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
      header={type === 'create' ? t('sellItem') : t('reconstruct')}
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
      {type === 'reconstruct' && (
        <ReconstructSales
          itemsChoices={itemsChoices}
          formValue={formValue}
          setFormValue={setFormValue}
        />
      )}
    </CRModal>
  );
};
export default ConsumeItems;
