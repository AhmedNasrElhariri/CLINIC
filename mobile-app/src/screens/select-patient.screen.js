import React from 'react';
import { Container, Content } from 'native-base';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/react-hooks';

export default () => {
  const { data } = useQuery(LIST_PATIENTS);
  const patients = (data && data.patients) || [];
  return (
    <Container>
      <Content>
        <CreatePatient onCreate={() => {}} />
      </Content>
    </Container>
  );
};
