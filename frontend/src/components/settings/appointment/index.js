import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import moment from 'moment';
import { Alert, Panel, PanelGroup } from 'rsuite';

import { CREATE_PATIENT, LIST_PATIENTS } from 'apollo-client/queries';
import WorkingHours from './working-hours';
import AppointmentInfo from './appointment-info';

function AppointmentSettings({ onCreate }) {
  const [createPatient] = useMutation(CREATE_PATIENT, {
    update(cache, { data: { createPatient: patient } }) {
      const { patients } = cache.readQuery({ query: LIST_PATIENTS });
      cache.writeQuery({
        query: LIST_PATIENTS,
        data: { patients: patients.concat([patient]) },
      });
    },
    onCompleted: () => {
      onCreate();
      Alert.success('Patient Created Successfully');
    },
    onError: () => Alert.error('Invalid Input'),
  });

  return (
    <PanelGroup bordered>
      <Panel header="Appointment Info">
        <AppointmentInfo />
      </Panel>
      <Panel header="Working Hours">
        <WorkingHours />
      </Panel>
    </PanelGroup>
  );
}

export default AppointmentSettings;
