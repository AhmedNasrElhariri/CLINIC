import React, { useState } from 'react';

import { MainContainer, CRCard, CRNav } from 'components';

import InventoryStatus from '../status';
import InventoryHistory from '../history';
import ItemsDefinitions from '../items-definitions';
import { Can } from 'components/user/can';

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
        {activeTab === '0' && (
          <Can I="add" an="Inventory">
            <InventoryStatus />
          </Can>
        )}
        {activeTab === '1' && (
          <Can I="view_history" an="Inventory">
            <InventoryHistory />
          </Can>
        )}
        {activeTab === '2' && (
          <Can I="define" an="Inventory">
            <ItemsDefinitions />
          </Can>
        )}
      </CRCard>
    </>
  );
};

export default InventoryPage;
