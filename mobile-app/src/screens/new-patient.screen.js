import React from 'react';
import NewPatient from '@/components/patients/new-patient';
import MainLayout from '@/components/layout/main';

const NewPatientScreen = props => {
  return (
    <MainLayout {...props}>
      <NewPatient onCreate={() => {}} />
    </MainLayout>
  );
};

export default NewPatientScreen;
