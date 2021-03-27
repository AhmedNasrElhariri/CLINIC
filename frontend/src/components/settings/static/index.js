import React, { useState } from 'react';
import styled from 'styled-components';
import { CRVNav } from 'components';
import Hospitals from './hospitals';
import Surgeries from './surgeries';
import MedicineDefinition from './medicine-definition';
import TestDefinition from './test-definition';
import ImageDefinition from './image-definition';
import PatientReport from './patient-report';
import Timing from './timing';
import LabCategory from './lab-category';
import ImageCategory from './image-category';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TabContainer = styled.div`
  width: 100%;
`;
function StaticSettings() {
  const [activeTab, setActiveTab] = useState('0');

  return (
    <Container>
      <CRVNav
        appearance="tabs"
        activeKey={activeTab}
        onSelect={setActiveTab}
        vertical
      >
        <CRVNav.CRItem eventKey="0">Hospitals</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="1">Surgeries</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="2">Medicine Definition</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="3">Lab Definition</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="4">Lab Category</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="5">Image Definition</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="6">Image Category</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="7">Timing</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="8">Patient Report</CRVNav.CRItem>
      </CRVNav>
      <TabContainer>
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
      </TabContainer>
    </Container>
  );
}

export default StaticSettings;
