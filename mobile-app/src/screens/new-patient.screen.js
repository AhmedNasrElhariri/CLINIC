import React from 'react';
import NewPatient from '@/components/patients/new-patient';
import MainLayout from '@/components/layout/main';

const NewPatientScreen = ({
  route: {
    params: { onGoBack },
  },
  navigation,
  ...props
}) => {
  return (
    <MainLayout {...props}>
      <NewPatient
        onCreate={patient => {
          onGoBack(patient);
          navigation.goBack();
        }}
      />
    </MainLayout>
  );
};

export default NewPatientScreen;
