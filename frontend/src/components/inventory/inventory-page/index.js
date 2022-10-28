import React, { useState } from 'react';
import { Nav } from 'rsuite';
import { Can } from 'components/user/can';
import InventoryStatus from '../status';
import InventoryHistory from '../history';
import InventoryManual from '../inventory-manual';
import { useTranslation } from 'react-i18next';

const InventoryPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <h1 className="text-2xl mb-4">{t('inventory')}</h1>
      <Nav
        activeKey={activeTab}
        onSelect={setActiveTab}
        appearance="tabs"
        justified
        className="text-center max-w-5xl mb-5"
      >
        <Nav.Item eventKey={0}>{t('inventory')}</Nav.Item>
        <Nav.Item eventKey={1}>{t('history')}</Nav.Item>
        <Nav.Item eventKey={2}>{t('completedAppointments')}</Nav.Item>
      </Nav>
      {activeTab === 0 && (
        <Can I="View" an="Inventory">
          <InventoryStatus />
        </Can>
      )}
      {activeTab === 1 && (
        <Can I="ViewHistory" an="Inventory">
          <InventoryHistory />
        </Can>
      )}
      {activeTab === 2 && (
        <Can I="AddCustom" an="Inventory">
          <InventoryManual />
        </Can>
      )}
    </>
  );
};

export default InventoryPage;
