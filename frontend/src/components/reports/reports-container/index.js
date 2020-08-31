import React from 'react';

import { Div, MainContainer, AccountingContainer, CRCard } from 'components';

import Reports from '../reports';

const ReportsContainer = () => {
  return (
    <>
      <MainContainer title="Reports" nobody></MainContainer>
      <CRCard borderless>
        <AccountingContainer />
      </CRCard>
      <Div mt={40}>
        <CRCard borderless>
          <Reports />
        </CRCard>
      </Div>
    </>
  );
};

export default ReportsContainer;
