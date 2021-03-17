import React from 'react';
import HistoryImages from './history-images';
import PendingImages from './pending-images';
import { CRTabs } from 'components';
const PatientImages = ({ patient }) => {
  return (
    <>
      <CRTabs>
        <CRTabs.CRTabsGroup>
          <CRTabs.CRTab>Pending Images</CRTabs.CRTab>
          <CRTabs.CRTab>History Images</CRTabs.CRTab>
        </CRTabs.CRTabsGroup>
        <CRTabs.CRContentGroup>
          <CRTabs.CRContent>
            <PendingImages patient={patient} />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <HistoryImages patient={patient} />
          </CRTabs.CRContent>
        </CRTabs.CRContentGroup>
      </CRTabs>
    </>
  );
};

PatientImages.propTypes = {};

export default PatientImages;
