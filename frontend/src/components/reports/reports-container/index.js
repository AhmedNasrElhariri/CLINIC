import React, { useState } from 'react';

import { MainContainer, AccountingContainer, CRCard, CRNav } from 'components';

import Reports from '../reports';

const ReportsContainer = () => {
  const [activeTab, setActiveTab] = useState('accounting');

  return (
    <>
      <MainContainer title="Reports" nobody></MainContainer>
      <CRNav
        appearance="tabs"
        activeKey={activeTab}
        onSelect={setActiveTab}
      >
        <CRNav.CRItem eventKey="accounting">Accounting</CRNav.CRItem>
        <CRNav.CRItem eventKey="statistics">Statistics</CRNav.CRItem>
      </CRNav>
      <CRCard borderless>
        {activeTab === 'accounting' && <AccountingContainer />}
        {activeTab === 'statistics' && <Reports />}
      </CRCard>
    </>
  );
};

export default ReportsContainer;
