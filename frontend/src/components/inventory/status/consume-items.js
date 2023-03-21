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
}) => {
  console.log(formValue, 'formValue');
  const handleOk = useCallback(() => {
    const { branchId, specialtyId, userId } = formValue;
    const data = {
      items: selectedItems,
      branchId,
      specialtyId,
      userId,
    };
    consumeInventoryManual(data);
  }, [formValue, consumeInventoryManual, selectedItems]);
  return (
    <CRModal
      show={visible}
      header={t('consumeInventory')}
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
      />
    </CRModal>
  );
};
export default ConsumeItems;
