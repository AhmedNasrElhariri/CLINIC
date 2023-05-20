import { CRModal } from 'components';
import { useCallback } from 'react';
import InventoryUsage from '../usage';

const ConsumeItems = ({
  setSelectedItems,
  close,
  selectedItems,
  formValue,
  visible,
  consumeInventoryManual,
  handleInventoryChange,
  t,
  setFormValue,
  isSelling,
}) => {
  const handleOk = useCallback(() => {
    const { branchId, specialtyId, userId } = formValue;
    const data = {
      items: selectedItems,
      branchId,
      specialtyId,
      userId,
      isSelling,
    };
    consumeInventoryManual(data);
  }, [formValue, consumeInventoryManual, selectedItems, isSelling]);
  return (
    <CRModal
      show={visible}
      header={isSelling ? t('sellItem') : t('consumeInventory')}
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
      <InventoryUsage
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        onChange={handleInventoryChange}
        formValue={formValue}
        setFormValue={setFormValue}
        isSelling={isSelling}
      />
    </CRModal>
  );
};
export default ConsumeItems;
