import React, { useState } from 'react';

import { MainContainer, CRNav } from 'components';
import Hospitals from './hospitals';
import Surgeries from './surgeries';
import MedicineLibrary from './medicine-library';

function StaticSettings() {
  const [activeTab, setActiveTab] = useState('0');

  return (
    <>
      <MainContainer title="Static Info">
        <CRNav
          appearance="tabs"
          activeKey={activeTab}
          onSelect={setActiveTab}
          width={500}
          justified
        >
          <CRNav.CRItem eventKey="0">Hospitals</CRNav.CRItem>
          <CRNav.CRItem eventKey="1">Surgeries</CRNav.CRItem>
          <CRNav.CRItem eventKey="2">Medicine Library</CRNav.CRItem>
        </CRNav>
        {activeTab === '0' ? <Hospitals /> :
          activeTab === '1' ? <Surgeries /> :
          <MedicineLibrary />
        }
      </MainContainer>
    </>
  );
}

export default StaticSettings;
