import React, { useMemo, useRef, useCallback, useState } from 'react';
import { MainContainer, CRCard } from 'components';
import AddItem from '../add-item';
import ListInventory from '../list-inventory';
import { useInventory, useAppointments, useModal, useForm } from 'hooks';
import Filter from '../../filters';
import { ACTIONS } from 'utils/constants';
import { Div, CRButton } from 'components';
import ReactToPrint from 'react-to-print';
import { useTranslation } from 'react-i18next';
import ConsumeUnits from './consume-items';
import { Schema } from 'rsuite';
const initInventoryValue = {
  itemId: null,
  quantity: 0,
  branchId: null,
  specialtyId: null,
  userId: null,
};
const { StringType, NumberType } = Schema.Types;

const model = Schema.Model({
  itemId: StringType().isRequired('Item is required'),
  quantity: NumberType().isRequired('Amount Type is required'),
});
const InventoryStatus = () => {
  const { items, inventoryWithAmount, consumeInventoryManual } = useInventory({
    onConsumeInventory: () => {
      close();
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
  const { filterBranches } = useAppointments({
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
            <AddItem items={items} />
            <CRButton onClick={() => handleConsumeInventory()} ml={10}>
              {t('consume')}
            </CRButton>
          </Div>
        }
        nobody
      ></MainContainer>
      <CRCard borderless>
        <Filter
          appointments={updatedInventoryWithAmount}
          branches={filterBranches}
          notAllowUser
          notAllowSpecialty
          render={inventories => (
            <Div>
              <ListInventory items={inventories} />
              <Div style={{ overflow: 'hidden', height: '0px' }}>
                <Div ref={ref} mt={20} mr={10}>
                  <ListInventory items={inventories} />
                </Div>
              </Div>
            </Div>
          )}
        />
      </CRCard>
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
