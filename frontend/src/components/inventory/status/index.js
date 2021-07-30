import React from 'react';
import { MainContainer, CRCard } from 'components';
import AddItem from '../add-item';
import ListInventory from '../list-inventory';
import { useInventory, useAppointments } from 'hooks';
import Filter from '../../filters';
import { ACTIONS } from 'utils/constants';

const InventoryStatus = () => {
  const { items, inventoryWithAmount } = useInventory();
  const { filterBranches } = useAppointments({action:ACTIONS.AddItem_Inventory});
  return (
    <>
      <MainContainer
        title="Inventory"
        more={<AddItem items={items} />}
        nobody
      ></MainContainer>
      <CRCard borderless>
        <Filter
          appointments={inventoryWithAmount}
          branches={filterBranches}
          render={inventories => <ListInventory items={inventories} />}
        />
      </CRCard>
    </>
  );
};

export default InventoryStatus;
