import React from 'react';
import HistoryLabs from './history-labs';
import PendingLabs from './pending-labs';
import { CRTabs } from 'components';
const PatientLabs = ({ patient }) => {
  return (
    <>
      <CRTabs>
        <CRTabs.CRTabsGroup>
          <CRTabs.CRTab>Pending</CRTabs.CRTab>
          <CRTabs.CRTab>History</CRTabs.CRTab>
        </CRTabs.CRTabsGroup>
        <CRTabs.CRContentGroup>
          <CRTabs.CRContent>
            <PendingLabs patient={patient} />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <HistoryLabs patient={patient} />
          </CRTabs.CRContent>
        </CRTabs.CRContentGroup>
      </CRTabs>
    </>
  );
};

PatientLabs.propTypes = {};

export default PatientLabs;
