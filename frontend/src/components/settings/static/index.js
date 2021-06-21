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
import Course from './course';
import SalesDefinition from './sales-definition';
import SessionDefinition from './session-definition';
import Price from './price';
import BanksDefinition from './banks-definition';
import CompanysDefinition from './companys-definition';
import CompanysSessions from './companys-sessions-definition';
import ExpensesTypes from './expenses-types-definition';
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
        <CRVNav.CRItem eventKey="8">Courses and Packages</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="9">Sales Definition</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="10">Price</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="11">Bank Definition</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="12">Insurance Companies</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="13">
          Insurance Companies Sessions
        </CRVNav.CRItem>
        <CRVNav.CRItem eventKey="14">Expenses Types</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="15">Sessions Definition</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="16">Patient Report</CRVNav.CRItem>
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
            case '8':
              return <Course />;
            case '9':
              return <SalesDefinition />;
            case '10':
              return <Price />;
            case '11':
              return <BanksDefinition />;
            case '12':
              return <CompanysDefinition />;
            case '13':
              return <CompanysSessions />;
            case '14':
              return <ExpensesTypes />;
            case '15':
              return <SessionDefinition />;
            default:
              return <PatientReport />;
          }
        })()}
      </TabContainer>
    </Container>
  );
}

export default StaticSettings;
