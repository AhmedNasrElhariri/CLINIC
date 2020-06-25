import React from 'react';

import WorkingHours from './working-hours';
import AppointmentInfo from './appointment-info';
import { H3, Div, CRButton } from 'components';

function AppointmentSettings({ onCreate }) {
  return (
    <>
      <Div display="flex" justifyContent="space-between">
        <H3 mb={64}>Appointments Info</H3>
        <Div>
          <CRButton>Save</CRButton>
        </Div>
      </Div>
      <AppointmentInfo />
      <H3 my={64}>Working Hours</H3>
      <WorkingHours />
    </>
  );
}

export default AppointmentSettings;
