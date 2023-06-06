import React, { useMemo, useRef, useCallback, useState } from 'react';
import { MainContainer, BranchSpecialtyUserFilter } from 'components';
import AddItem from '../add-item';
import ListInventory from '../list-inventory';
import { useInventory, useModal, useForm, useBranchTree } from 'hooks';
import { ACTIONS } from 'utils/constants';
import { Div, CRButton } from 'components';
import ReactToPrint from 'react-to-print';
import { useTranslation } from 'react-i18next';
import ConsumeUnits from './consume-items';
import { Schema, Alert } from 'rsuite';
import ReconciliateSales from 'components/sales-from-inventory/reconstruct';
import * as R from 'ramda';
import { Can } from 'components/user/can';

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
    reconcilateSales,
  } = useInventory({
    branchId: branchSpecialtyUser?.branch,
    specialtyId: branchSpecialtyUser?.specialty,
    doctorId: branchSpecialtyUser?.doctor,
    onConsumeInventory: () => {
      close();
    },
    onReconsilate: () => {
      close();
    },
    onAddCompleted: () => {
      Alert.success('Item has been created successfully');
    },
  });

  const { visible, close, open } = useModal({});
  const { t } = useTranslation();
  const [selectedItems, setSelectedItems] = useState([]);
  const { formValue, setFormValue, type, setType } = useForm({
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

  const itemsChoices = useMemo(() => {
    const selectedItemIds = R.map(R.prop('itemId'))(selectedItems);
    return inventoryWithAmount.filter(
      f => !selectedItemIds.includes(f.id) && f?.item.sellable
    );
  }, [selectedItems, inventoryWithAmount]);

  const { filterBranches } = useBranchTree({
    action: ACTIONS.View_Inventory,
  });

  const handleConsumeInventory = useCallback(() => {
    setType('consumeInventory');
    open();
  }, [open]);
  const handleInventoryChange = useCallback(() => {}, []);

  const handleClickReconcilate = useCallback(() => {
    setType('reconcilate');
    open();
  }, [setType, open]);

  return (
    <>
      <MainContainer
        title={t('inventory')}
        more={
          <Div display="flex">
            <CRButton onClick={() => handleConsumeInventory()} mr={10}>
              {t('consume')}
            </CRButton>
            <Can I="Reconciliation" an="Inventory">
              <CRButton
                variant="primary"
                onClick={handleClickReconcilate}
                mr={10}
              >
                {t('reconciliate')}
              </CRButton>
            </Can>
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
      {type === 'consumeInventory' && (
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
      )}
      {type === 'reconcilate' && (
        <ReconciliateSales
          itemsChoices={itemsChoices}
          formValue={formValue}
          setFormValue={setFormValue}
          reconcilateSales={reconcilateSales}
          visible={visible}
          close={close}
        />
      )}
    </>
  );
};

export default InventoryStatus;
