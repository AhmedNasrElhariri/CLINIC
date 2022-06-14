import React, { useCallback, useState } from 'react';
import { CRButton, Div, CRModal } from 'components';
import { useModal, useForm, useInventory } from 'hooks';
import InventoryUsage from '../usage';
import { Schema, Alert } from 'rsuite';
import { useTranslation } from 'react-i18next';

const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  itemId: StringType().isRequired('Item is required'),
  quantity: NumberType().isRequired('Amount Type is required'),
});
const initInventoryValue = {
  itemId: null,
  quantity: 1,
  branchId: null,
  specialtyId: null,
  userId: null,
};
const InventoryManual = () => {
  const { visible, close, open } = useModal({});
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = useState([]);
  const { formValue, setFormValue } = useForm({
    initValue: initInventoryValue,
    model,
  });
  const { consumeInventoryManual } = useInventory({});
  const handleConsumeInventory = useCallback(() => {
    open();
  }, [open]);
  const handleInventoryChange = useCallback(() => {}, []);
  return (
    <>
      <Div display="flex" justifyContent="right" mt={10}>
        <CRButton onClick={() => handleConsumeInventory()}>
          {t('consume')}
        </CRButton>
      </Div>
      <CRModal
        show={visible}
        header={t('consumeInventory')}
        onOk={() => {
          const { branchId, specialtyId, userId } = formValue;
          const data = {
            items: selectedItems,
            branchId,
            specialtyId,
            userId,
          };
          consumeInventoryManual(data);
          close();
        }}
        onHide={() => {
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
    </>
  );
};

export default InventoryManual;
