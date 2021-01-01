import React, { useState } from 'react';

import { MainContainer, CRNav } from 'components';
import Hospitals from './hospitals';
import Surgeries from './surgeries';

function StaticSettings() {
  const [activeTab, setActiveTab] = useState('0');

  return (
    <>
      <MainContainer title="Static Info">
        <CRNav
          appearance="tabs"
          activeKey={activeTab}
          onSelect={setActiveTab}
          width={300}
          justified
        >
          <CRNav.CRItem eventKey="0">Hospitals</CRNav.CRItem>
          <CRNav.CRItem eventKey="1">Surgeries</CRNav.CRItem>
        </CRNav>
        {activeTab === '0' ? <Hospitals /> : <Surgeries />}
      </MainContainer>
    </>
  );
}

export default StaticSettings;
