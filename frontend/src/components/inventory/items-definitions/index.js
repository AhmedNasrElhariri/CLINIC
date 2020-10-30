import React from 'react';

import { MainContainer, CRCard } from 'components';

import ListItemsDefinitions from '../list-items-definitions/index';
import NewItem from '../new-item';
import useFetchInventory from 'hooks/fetch-inventory';

const ItemsDefinitions = () => {
  const { items } = useFetchInventory();

  return (
    <>
      <MainContainer title="Items" more={<NewItem />} nobody></MainContainer>
      <CRCard borderless>
        <ListItemsDefinitions items={items} />
      </CRCard>
    </>
  );
};

ItemsDefinitions.propTypes = {};

export default ItemsDefinitions;
