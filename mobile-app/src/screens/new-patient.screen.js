import React from 'react';
import { Container, Content } from 'native-base';
import NewPatient from '@/components/patients/new-patient';

export default () => {
  return (
    <Container>
      <Content>
        <NewPatient onCreate={() => {}} />
      </Content>
    </Container>
  );
};
