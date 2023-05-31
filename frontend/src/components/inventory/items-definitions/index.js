import React, { useState, useMemo } from 'react';

import { MainContainer, CRCard, CRTextInput, Div } from 'components';

import ListItemsDefinitions from '../list-items-definitions/index';
import NewItem from '../new-item';
import { useInventory } from 'hooks';
import { useTranslation } from 'react-i18next';
import { Form } from 'rsuite';

const ItemsDefinitions = () => {
  const { items } = useInventory();
  const [filter, setFilter] = useState('');
  const { t } = useTranslation();
  const updatedItems = useMemo(
    () => items.filter(i => i.name.includes(filter)),
    [items, filter]
  );

  return (
    <>
      <MainContainer
        title={t('items')}
        more={
          <Div display="flex">
            <Form style={{ marginTop: '-10px', marginRight: '10px' }}>
              <CRTextInput onChange={setFilter} placeholder="Search" />
            </Form>
            <NewItem />
          </Div>
        }
        nobody
      ></MainContainer>
      <CRCard borderless>
        <ListItemsDefinitions items={updatedItems} t={t} />
      </CRCard>
    </>
  );
};

ItemsDefinitions.propTypes = {};

export default ItemsDefinitions;
