import React, { useState } from 'react';
import { CRNav } from 'components';
import { useTranslation } from 'react-i18next';
import ListPatients from './list-patients';
import ListPatientsReports from './list-patients-reports';

function Patients() {
  const [activeTab, setActiveTab] = useState('0');
  const { t } = useTranslation();

  return (
    <>
      <CRNav appearance="tabs" activeKey={activeTab} onSelect={setActiveTab}>
        <CRNav.CRItem eventKey="0">{t('patients')}</CRNav.CRItem>
        <CRNav.CRItem eventKey="1">{t('patientReports')}</CRNav.CRItem>
      </CRNav>
      {activeTab === '0' ? <ListPatients /> : <ListPatientsReports />}
    </>
  );
}

export default Patients;
