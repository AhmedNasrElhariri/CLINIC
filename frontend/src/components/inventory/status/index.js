import React, { useMemo, useRef } from 'react';
import { MainContainer, CRCard } from 'components';
import AddItem from '../add-item';
import ListInventory from '../list-inventory';
import { useInventory, useAppointments } from 'hooks';
import Filter from '../../filters';
import { ACTIONS } from 'utils/constants';
import { Div, CRButton } from 'components';
import ReactToPrint from 'react-to-print';

const InventoryStatus = () => {
  const { items, inventoryWithAmount } = useInventory();
  const ref = useRef();
  const updatedInventoryWithAmount = useMemo(() => {
    const newInventory = inventoryWithAmount.map(i => {
      return { ...i, doctor: i.user };
    });
    return newInventory;
  }, [inventoryWithAmount]);
  const { filterBranches } = useAppointments({
    action: ACTIONS.AddItem_Inventory,
  });
  return (
    <>
      <MainContainer
        title="Inventory"
        more={
          <Div display="flex">
            <ReactToPrint
              trigger={() => (
                <CRButton primary mr={10}>
                  Print
                </CRButton>
              )}
              content={() => ref.current}
            />
            <AddItem items={items} />
          </Div>
        }
        nobody
      ></MainContainer>
      <CRCard borderless>
        <Filter
          appointments={updatedInventoryWithAmount}
          branches={filterBranches}
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
    </>
  );
};

export default InventoryStatus;
