import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MainContainer,
  BankAccountingContainer,
  InsuranceAccountingContainer,
  CRTabs,
} from 'components';

const ReportsContainer = () => {
  const { t } = useTranslation();
  return (
    <>
      <MainContainer title={t('reports')} nobody></MainContainer>
      <CRTabs>
        <CRTabs.CRTabsGroup>
          <CRTabs.CRTab>{t('bankAccounting')}</CRTabs.CRTab>
          <CRTabs.CRTab>{t('insuranceAccounting')}</CRTabs.CRTab>
        </CRTabs.CRTabsGroup>
        <CRTabs.CRContentGroup>
          <CRTabs.CRContent>
            <BankAccountingContainer />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <InsuranceAccountingContainer />
          </CRTabs.CRContent>
        </CRTabs.CRContentGroup>
      </CRTabs>
    </>
  );
};

export default memo(ReportsContainer);
