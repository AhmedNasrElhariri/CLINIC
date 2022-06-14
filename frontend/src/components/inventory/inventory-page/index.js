import React, { useState } from 'react';

import { MainContainer, CRCard, CRNav } from 'components';
import { Can } from 'components/user/can';
import InventoryStatus from '../status';
import InventoryHistory from '../history';
import ItemsDefinitions from '../items-definitions';
import InventoryManual from '../inventory-manual';
import { useTranslation } from 'react-i18next';

const InventoryPage = () => {
  const { t } = useTranslation();
  const tabs = [
    { name: t('inventory'), key: '0', component: InventoryStatus },
    { name: t('history'), key: '1', component: InventoryHistory },
    { name: t('itemDefinition'), key: '2', component: ItemsDefinitions },
    { name: t('inventoryManual'), key: '3', component: ItemsDefinitions },
  ];
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  return (
    <>
      <MainContainer title={t('inventory')} nobody></MainContainer>
      <CRNav
        appearance="tabs"
        activeKey={activeTab}
        onSelect={setActiveTab}
        width={1000}
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
          <Can I="View" an="Inventory">
            <InventoryStatus />
          </Can>
        )}
        {activeTab === '1' && (
          <Can I="ViewHistory" an="Inventory">
            <InventoryHistory />
          </Can>
        )}
        {activeTab === '2' && (
          <Can I="DefineItem" an="Inventory">
            <ItemsDefinitions />
          </Can>
        )}
        {activeTab === '3' && (
          <Can I="AddCustom" an="Inventory">
            <InventoryManual />
          </Can>
        )}
      </CRCard>
    </>
  );
};

export default InventoryPage;
