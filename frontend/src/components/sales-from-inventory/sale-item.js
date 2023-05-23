import { CRModal } from 'components';
import { useCallback } from 'react';
import SaleItem from './form';
import EditSale from './edit-sale';
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
  editSale,
}) => {
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
      const { saleOption, ...rest } = formValue;
      editSale({ variables: { sales: rest } });
    }
  }, [
    formValue,
    consumeInventoryManual,
    selectedItems,
    isSelling,
    type,
    editSale,
  ]);
  return (
    <CRModal
      show={visible}
      header={type === 'create' ? t('sellItem') : t('editSale')}
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
        />
      )}
      {type === 'edit' && (
        <EditSale formValue={formValue} setFormValue={setFormValue} />
      )}
    </CRModal>
  );
};
export default ConsumeItems;
