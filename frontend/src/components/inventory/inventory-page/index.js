import React, { useState } from 'react';

import { MainContainer, CRCard, CRNav } from 'components';

import InventoryStatus from '../status';
import InventoryHistory from '../history';
import ItemsDefinitions from '../items-definitions';


const tabs = [
  { name: 'Inventory', key: '0', component: InventoryStatus },
  { name: 'History', key: '1', component: InventoryHistory },
  { name: 'Item Definition', key: '2', component: ItemsDefinitions },
];

const InventoryPage = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].key);

  return (
    <>
      <MainContainer title="Inventory" nobody></MainContainer>
      <CRNav
        appearance="tabs"
        activeKey={activeTab}
        onSelect={setActiveTab}
        width={500}
        justified
      >
        {tabs.map(({ key, name }) => (
          <CRNav.CRItem key={key} eventKey={key}>
            {name}
          </CRNav.CRItem>
        ))}
      </CRNav>
      <CRCard borderless>
        {activeTab === '0' && <InventoryStatus />}
        {activeTab === '1' && <InventoryHistory />}
        {activeTab === '2' && <ItemsDefinitions />}
      </CRCard>
    </>
  );
};

export default InventoryPage;
