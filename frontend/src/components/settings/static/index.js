import React, { useState } from 'react';

import { MainContainer, CRNav } from 'components';
import { Icon, Dropdown } from 'rsuite';
import Hospitals from './hospitals';
import Surgeries from './surgeries';
import MedicineDefinition from './medicine-definition';
import TestDefinition from './test-definition';
import ImageDefinition from './image-definition';
import PatientReport from './patient-report';
import Timing from './timing';
import LabCategory from './lab-category';
import ImageCategory from './image-category';
function StaticSettings() {
  const [activeTab, setActiveTab] = useState('0');

  return (
    <>
      <MainContainer title="Static Info">
        <CRNav
          appearance="tabs"
          activeKey={activeTab}
          onSelect={setActiveTab}
          justified
        >
          <CRNav.CRItem eventKey="0">Hospitals</CRNav.CRItem>
          <CRNav.CRItem eventKey="1">Surgeries</CRNav.CRItem>
          <CRNav.CRItem eventKey="2">Medicine Definition</CRNav.CRItem>
          <CRNav.CRItem eventKey="3">Lab Definition</CRNav.CRItem>
          <CRNav.CRItem eventKey="4">Lab Category</CRNav.CRItem>
          {/* <Dropdown icon={<Icon icon="ellipsis-h" />} title="more..." style={{backgroundColor: '#eef1f1',height:'50px'}}>
            <Dropdown.Item eventKey="5">Image Definition</Dropdown.Item>
            <Dropdown.Item eventKey="6">Image Category</Dropdown.Item>
            <Dropdown.Item eventKey="7">Timing</Dropdown.Item>
            <Dropdown.Item eventKey="8">Patient Report</Dropdown.Item>
          </Dropdown> */}
          <CRNav.CRItem eventKey="5">Image Definition</CRNav.CRItem>
          <CRNav.CRItem eventKey="6">Image Category</CRNav.CRItem>
          <CRNav.CRItem eventKey="7">Timing</CRNav.CRItem>
          <CRNav.CRItem eventKey="8">Patient Report</CRNav.CRItem>
        </CRNav>
        {(() => {
          switch (activeTab) {
            case '0':
              return <Hospitals />;
            case '1':
              return <Surgeries />;
            case '2':
              return <MedicineDefinition />;
            case '3':
              return <TestDefinition />;
            case '4':
              return <LabCategory />;
            case '5':
              return <ImageDefinition />;
            case '6':
              return <ImageCategory />;
            case '7':
              return <Timing />;
            default:
              return <PatientReport />;
          }
        })()}
      </MainContainer>
    </>
  );
}

export default StaticSettings;
