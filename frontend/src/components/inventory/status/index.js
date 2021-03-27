import React from 'react';
import { MainContainer, CRCard } from 'components';
import AddItem from '../add-item';
import ListInventory from '../list-inventory';
import { useInventory } from 'hooks';

const InventoryStatus = () => {
  const { items, inventoryWithAmount } = useInventory();
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
