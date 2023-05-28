import React, { useMemo, useRef, useCallback, useState } from 'react';
import { MainContainer, CRCard, BranchSpecialtyUserFilter } from 'components';
import AddItem from '../add-item';
import ListInventory from '../list-inventory';
import {
  useInventory,
  useAppointments,
  useModal,
  useForm,
  useBranchTree,
} from 'hooks';
import Filter from '../../filters';
import { ACTIONS } from 'utils/constants';
import { Div, CRButton } from 'components';
import ReactToPrint from 'react-to-print';
import { useTranslation } from 'react-i18next';
import ConsumeUnits from './consume-items';
import { Schema, Alert } from 'rsuite';
const initInventoryValue = {
  itemId: null,
  quantity: 0,
  noOfBoxes: 0,
  branchId: null,
  specialtyId: null,
  userId: null,
};
const initialBranchValue = {
  branch: null,
  specialty: null,
  doctor: null,
};
const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  item: StringType().isRequired('Item is required'),
  quantity: NumberType().isRequired('Amount Type is required'),
});
const InventoryStatus = () => {
  const [branchSpecialtyUser, setBranchSpecialtyUser] =
    useState(initialBranchValue);
  const {
    items,
    inventoryWithAmount,
    consumeInventoryManual,
    addItem,
    addItemLoading,
  } = useInventory({
    branchId: branchSpecialtyUser?.branch,
    specialtyId: branchSpecialtyUser?.specialty,
    doctorId: branchSpecialtyUser?.doctor,
    onConsumeInventory: () => {
      close();
    },
    onAddCompleted: () => {
      Alert.success('Item has been created successfully');
    },
  });

  const { visible, close, open } = useModal({});
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = useState([]);
  const { formValue, setFormValue } = useForm({
    initValue: initInventoryValue,
    model,
  });
  const ref = useRef();
  const updatedInventoryWithAmount = useMemo(() => {
    const newInventory = inventoryWithAmount.map(i => {
      return { ...i, doctor: i.user };
    });
    return newInventory;
  }, [inventoryWithAmount]);
  const { filterBranches } = useBranchTree({
    action: ACTIONS.View_Inventory,
  });

  const handleConsumeInventory = useCallback(() => {
    open();
  }, [open]);
  const handleInventoryChange = useCallback(() => {}, []);

  return (
    <>
      <MainContainer
        title={t('inventory')}
        more={
          <Div display="flex">
            <ReactToPrint
              trigger={() => (
                <CRButton primary mr={10}>
                  {t('print')}
                </CRButton>
              )}
              content={() => ref.current}
            />
            <AddItem
              items={items}
              addItem={addItem}
              addItemLoading={addItemLoading}
            />
            <CRButton onClick={() => handleConsumeInventory()} ml={10}>
              {t('consume')}
            </CRButton>
          </Div>
        }
        nobody
      ></MainContainer>

      <BranchSpecialtyUserFilter
        formValue={branchSpecialtyUser}
        onChange={setBranchSpecialtyUser}
        branches={filterBranches}
      />
      <Div>
        <ListInventory items={updatedInventoryWithAmount} />
        <Div style={{ overflow: 'hidden', height: '0px' }}>
          <Div ref={ref} mt={20} mr={10}>
            <ListInventory items={updatedInventoryWithAmount} />
          </Div>
        </Div>
      </Div>
      <ConsumeUnits
        setSelectedItems={setSelectedItems}
        close={close}
        selectedItems={selectedItems}
        formValue={formValue}
        visible={visible}
        consumeInventoryManual={consumeInventoryManual}
        handleInventoryChange={handleInventoryChange}
        t={t}
        setFormValue={setFormValue}
      />
    </>
  );
};

export default InventoryStatus;
