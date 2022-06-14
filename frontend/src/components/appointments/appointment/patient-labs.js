import React from 'react';
import HistoryLabs from './history-labs';
import PendingLabs from './pending-labs';
import { CRTabs } from 'components';
import { useTranslation } from 'react-i18next';
const PatientLabs = ({ patient }) => {
  const { t } = useTranslation();
  return (
    <>
      <CRTabs>
        <CRTabs.CRTabsGroup>
          <CRTabs.CRTab>{t('pendingLab')}</CRTabs.CRTab>
          <CRTabs.CRTab>{t('historyLab')}</CRTabs.CRTab>
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
