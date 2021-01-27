import React, { useState } from 'react';

import { MainContainer, CRNav } from 'components';
import Hospitals from './hospitals';
import Surgeries from './surgeries';
import MedicineLibrary from './medicine-library';
import TestLibrary from './test-library';
import ImageLibrary from './image-library';

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
          <CRNav.CRItem eventKey="2">Medicine Library</CRNav.CRItem>
          <CRNav.CRItem eventKey="3">Test Library</CRNav.CRItem>
          <CRNav.CRItem eventKey="4">Image Library</CRNav.CRItem>
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
                    <MedicineLibrary />
                  )
              case "3":
                  return (
                    <TestLibrary />
                  )
              default:
                  return (
                    <ImageLibrary />
                  )
        }

        })()}
      </MainContainer>
    </>
  );
}

export default StaticSettings;
