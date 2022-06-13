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
import BanksDefinition from './banks-definition';
import CompanysDefinition from './companys-definition';
import CompanysSessions from './companys-sessions-definition';
import ExpensesTypes from './expenses-types-definition';
import DentalDiagnosis from './dental-diagnosis-definition';
import FaceMaterials from './face-materials';
import AppointmentTypeDefinition from './appointment-type-definition';
import { get } from 'services/local-storage';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const TabContainer = styled.div`
  width: 100%;
  margin: 0px 3px;
`;
function StaticSettings() {
  const [activeTab, setActiveTab] = useState('0');
  const { t } = useTranslation();

  const dir = get('dir');
  let border = '2px solid #eef1f1';
  let borderRight = '';
  let borderLeft = '';
  if (dir === 'ltr') {
    borderRight = border;
    borderLeft = 'none';
  } else {
    borderRight = 'none';
    borderLeft = border;
  }
  return (
    <Container>
      <CRVNav
        appearance="tabs"
        activeKey={activeTab}
        onSelect={setActiveTab}
        vertical
        borderRight={borderRight}
        borderLeft={borderLeft}
      >
        <CRVNav.CRItem eventKey="0">{t('hospitals')}</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="1">{t('surgeries')}</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="2">{t('medicineDefinition')}</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="3">{t('labDefinition')}</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="4">{t('labCategory')}</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="5">{t('imageDefinition')}</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="6">{t('imageCategory')}</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="7">{t('timing')}</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="8">{t('coursesAndPackages')}</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="9">{t('salesDefinition')}</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="10">{t('bankDefinition')}</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="11">{t('insuranceCompanies')}</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="12">
          {t('insuranceCompaniesSessions')}
        </CRVNav.CRItem>
        <CRVNav.CRItem eventKey="13">{t('expensesTypes')}</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="14">{t('sessionsDefinition')}</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="15">{t('dentalDiagnosis')}</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="16">{t('faceMaterials')}</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="17">{t('patientReport')}</CRVNav.CRItem>
        <CRVNav.CRItem eventKey="18">{t('appointmentType')}</CRVNav.CRItem>
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
              return <BanksDefinition />;
            case '11':
              return <CompanysDefinition />;
            case '12':
              return <CompanysSessions />;
            case '13':
              return <ExpensesTypes />;
            case '14':
              return <SessionDefinition />;
            case '15':
              return <DentalDiagnosis />;
            case '16':
              return <FaceMaterials />;
            case '17':
              return <PatientReport />;
            default:
              return <AppointmentTypeDefinition />;
          }
        })()}
      </TabContainer>
    </Container>
  );
}

export default StaticSettings;
