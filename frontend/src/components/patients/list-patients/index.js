import React, { useState } from 'react';
// import { CRNav } from 'components';
import { useTranslation } from 'react-i18next';
import ListPatients from './list-patients';
import ListPatientsReports from './list-patients-reports';
import { Nav } from 'rsuite';

function Patients() {
  const [activeTab, setActiveTab] = useState('0');
  const { t } = useTranslation();

  return (
    <>
      <Nav appearance="tabs" activeKey={activeTab} onSelect={setActiveTab} justified className='text-center'>
        <Nav.Item eventKey="0">{t('patients')}</Nav.Item>
        <Nav.Item eventKey="1">{t('patientReports')}</Nav.Item>
      </Nav>
      {activeTab === '0' ? <ListPatients /> : <ListPatientsReports />}
    </>
  );
}

export default Patients;
