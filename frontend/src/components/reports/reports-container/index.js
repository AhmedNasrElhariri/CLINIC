import React from 'react';

import { MainContainer, AccountingContainer, CRTabs } from 'components';
import BankInsuranceAccountingContainer from './banking-insurance';
import ReportsPrintOut from '../print-reports';
import Reports from '../reports';
import { useTranslation } from 'react-i18next';

const ReportsContainer = () => {
  const { t } = useTranslation();
  return (
    <>
      <MainContainer title={t('reports')} nobody></MainContainer>
      <CRTabs>
        <CRTabs.CRTabsGroup>
          <CRTabs.CRTab>{t('accounting')}</CRTabs.CRTab>
          <CRTabs.CRTab>{t('bankAndInsuranceAccounting')}</CRTabs.CRTab>
          <CRTabs.CRTab>{t('statistics')}</CRTabs.CRTab>
          <CRTabs.CRTab>{t('reports')}</CRTabs.CRTab>
        </CRTabs.CRTabsGroup>
        <CRTabs.CRContentGroup>
          <CRTabs.CRContent>
            <AccountingContainer />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <BankInsuranceAccountingContainer />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <Reports />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <ReportsPrintOut />
          </CRTabs.CRContent>
        </CRTabs.CRContentGroup>
      </CRTabs>
    </>
  );
};

export default ReportsContainer;
