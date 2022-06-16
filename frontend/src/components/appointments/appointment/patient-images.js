import React from 'react';
import HistoryImages from './history-images';
import PendingImages from './pending-images';
import { CRTabs } from 'components';
import { useTranslation } from 'react-i18next';

const PatientImages = ({ patient }) => {
  const { t } = useTranslation();
  return (
    <>
      <CRTabs>
        <CRTabs.CRTabsGroup>
          <CRTabs.CRTab>{t('pendingImage')}</CRTabs.CRTab>
          <CRTabs.CRTab>{t('historyImage')}</CRTabs.CRTab>
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
