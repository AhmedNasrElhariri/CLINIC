import React from 'react';
import {
  MainContainer,
  BankAccountingContainer,
  InsuranceAccountingContainer,
  CRTabs,
} from 'components';


const ReportsContainer = () => {
  return (
    <>
      <MainContainer title="Reports" nobody></MainContainer>
      <CRTabs>
        <CRTabs.CRTabsGroup>
          <CRTabs.CRTab>Bank Accounting</CRTabs.CRTab>
          <CRTabs.CRTab>Insurance Accounting</CRTabs.CRTab>
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

export default ReportsContainer;
