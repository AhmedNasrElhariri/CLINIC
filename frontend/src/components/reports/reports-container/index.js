import React, { useState } from 'react';
import * as R from 'ramda';
import * as moment from 'moment';

import { Div, MainContainer, AccountingContainer, CRCard } from 'components';

import useFetchAppointments from 'hooks/fetch-appointments';
import Reports from '../reports';

const ReportsContainer = () => {
  const { appointments } = useFetchAppointments();
  const [active, setActive] = useState(0);

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
