import React, { useState } from 'react';

import { MainContainer, CRNav } from 'components';
import Hospitals from './hospitals';
import Surgeries from './surgeries';
import MedicineDefinition from './medicine-definition';
import TestDefinition from './test-definition';
import ImageDefinition from './image-definition';

function StaticSettings() {
  const [activeTab, setActiveTab] = useState('0');

  return (
    <>
      <MainContainer title="Static Info">
        <CRNav
          appearance="tabs"
          activeKey={activeTab}
          onSelect={setActiveTab}
          width={1000}
          justified
        >
          <CRNav.CRItem eventKey="0">Hospitals</CRNav.CRItem>
          <CRNav.CRItem eventKey="1">Surgeries</CRNav.CRItem>
          <CRNav.CRItem eventKey="2">Medicine Definition</CRNav.CRItem>
          <CRNav.CRItem eventKey="3">Test Definition</CRNav.CRItem>
          <CRNav.CRItem eventKey="4">Image Definition</CRNav.CRItem>
        </CRNav>
        {/* {activeTab === '0' ? <Hospitals /> :
          activeTab === '1' ? <Surgeries /> :
          <MedicineLibrary />
        } */}
        {(() => {
          switch (activeTab) {
              case "0":
                  return (
                    <Hospitals />
                  )
              case "1":
                  return (
                    <Surgeries />
                  )
              case "2":
                  return (
                    <MedicineDefinition />
                  )
              case "3":
                  return (
                    <TestDefinition />
                  )
              default:
                  return (
                    <ImageDefinition />
                  )
        }

        })()}
      </MainContainer>
    </>
  );
}

export default StaticSettings;
