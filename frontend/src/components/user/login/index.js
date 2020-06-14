import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Alert, Form, Schema } from 'rsuite';

import { Div, CRTextInput, CRButton, H1 } from 'components';
import { LOGIN } from 'apollo-client/queries';
import { CoverStyled } from './style';

const { StringType } = Schema.Types;

const model = Schema.Model({
  type: StringType().isRequired('Appointment Type is required'),
  patient: StringType().isRequired('Patient Type is required'),
});

const initialValues = {
  email: '',
  password: '',
};

function Login({ onLoginSucceeded, onLoginFailed }) {
  const [formValue, setFormValue] = useState(initialValues);

  const [login] = useMutation(LOGIN, {
    onCompleted: ({ login: { token } }) => {
      Alert.success('Your Logged Successfully');
      onLoginSucceeded(token);
    },
    onError: () => {
      Alert.error('Invalid Input');
      onLoginFailed();
    },
  });

  return (
    <Div display="flex" width="100%" height="100vh">
      <Div
        flexGrow={1}
        width="100%"
        pt={90}
        display="flex"
        flexDirection="column"
      >
        <Div>
          <Div as="img" src="logo.png" alt="" width="auto" />
        </Div>
        <Div flexGrow={1}>
          <Div>
            <H1 variant="primary" textTransform="uppercase">
              Appointments
            </H1>
            <H1 variant="dark" textTransform="uppercase">
              Reports
            </H1>
            <H1 variant="dark" textTransform="uppercase">
              Agenda
            </H1>
          </Div>
          <Div width={447}>
            <Form
              fluid
              model={model}
              formValue={formValue}
              onChange={value => setFormValue(value)}
            >
              <CRTextInput placeholder="Email" name="email" />
              <CRTextInput placeholder="Password" name="password" type="password" />
              <CRButton
                block
                onClick={() => login({ variables: { ...formValue } })}
              >
                Login
              </CRButton>
            </Form>
          </Div>
        </Div>
      </Div>
      <CoverStyled flexGrow={1} width="100%" />
    </Div>
  );
}

export default Login;
