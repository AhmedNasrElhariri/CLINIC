import React from 'react';

import { MainContainer, AccountingContainer, CRTabs } from 'components';

import Reports from '../reports';
import PrintReports from '../print-reports';
const ReportsContainer = () => {
  return (
    <>
      <MainContainer title="Reports" nobody></MainContainer>
      <CRTabs>
        <CRTabs.CRTabsGroup>
          <CRTabs.CRTab>Accounting</CRTabs.CRTab>
          <CRTabs.CRTab>Statistics</CRTabs.CRTab>
          <CRTabs.CRTab>Reports</CRTabs.CRTab>
        </CRTabs.CRTabsGroup>
        <CRTabs.CRContentGroup>
          <CRTabs.CRContent>
            <AccountingContainer />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <Reports />
          </CRTabs.CRContent>
          <CRTabs.CRContent>
            <PrintReports />
          </CRTabs.CRContent>
        </CRTabs.CRContentGroup>
      </CRTabs>
    </>
  );
};

export default ReportsContainer;
