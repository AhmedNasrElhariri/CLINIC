import React from 'react';

import {
  MainContainer,
  AccountingContainer,
  CRTabs,
} from 'components';
import BankInsuranceAccountingContainer from './banking-insurance';
import Reports from '../reports';
const ReportsContainer = () => {
  return (
    <>
      <MainContainer title="Reports" nobody></MainContainer>
      <CRTabs>
        <CRTabs.CRTabsGroup>
          <CRTabs.CRTab>Accounting</CRTabs.CRTab>
          <CRTabs.CRTab>Bank and Insurance Accounting</CRTabs.CRTab>
          <CRTabs.CRTab>Statistics</CRTabs.CRTab>
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
        </CRTabs.CRContentGroup>
      </CRTabs>
    </>
  );
};

export default ReportsContainer;
