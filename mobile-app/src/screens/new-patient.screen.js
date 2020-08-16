import React from 'react';
import * as R from 'ramda';

import NewPatient from '@/components/patients/new-patient';
import MainLayout from '@/components/layout/main';

const NewPatientScreen = ({ route, navigation, ...props }) => {
  const onGoBack = R.path(['params', 'onGoBack'])(route);
  return (
    <MainLayout {...props}>
      <NewPatient
        onCreate={patient => {
          onGoBack && onGoBack(patient);
          navigation.goBack();
        }}
      />
    </MainLayout>
  );
};

export default NewPatientScreen;
