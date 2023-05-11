import React from 'react';

import { MainContainer, CRCard } from 'components';

import ListItemsDefinitions from '../list-items-definitions/index';
import NewItem from '../new-item';
import { useInventory } from 'hooks';
import { useTranslation } from 'react-i18next';

const ItemsDefinitions = () => {
  const { items } = useInventory();
  const { t } = useTranslation();
  return (
    <>
      <MainContainer
        title={t('items')}
        more={<NewItem />}
        nobody
      ></MainContainer>
      <CRCard borderless>
        <ListItemsDefinitions items={items} t={t}/>
      </CRCard>
    </>
  );
};

ItemsDefinitions.propTypes = {};

export default ItemsDefinitions;
