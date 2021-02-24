import React from 'react';
import { MainContainer, CRCard } from 'components';
import AddItem from '../add-item';
import useFetchInventory from 'hooks/use-inventory';
import ListInventory from '../list-inventory/index';

const InventoryStatus = () => {
  const { items, inventoryWithAmount } = useFetchInventory();
  return (
    <>
      <MainContainer
        title="Inventory"
        more={<AddItem items={items} />}
        nobody
      ></MainContainer>
      <CRCard borderless>
        <ListInventory items={inventoryWithAmount} />
      </CRCard>
    </>
  );
};

export default InventoryStatus;
