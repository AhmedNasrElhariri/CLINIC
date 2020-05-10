import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import {
  Alert,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Input,
  Schema,
  Panel,
} from 'rsuite';

import { LOGIN } from 'apollo-client/queries';
import { FormStyled } from './style';

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
  const [formValue, SetFormValue] = useState(initialValues);

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
    <Panel shaded>
      <FormStyled>
        <Form
          fluid
          model={model}
          formValue={formValue}
          onChange={value => SetFormValue(value)}
        >
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl name="email" accepter={Input} />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Passoword</ControlLabel>
            <FormControl name="password" type="password" accepter={Input} />
          </FormGroup>

          <Button
            appearance="primary"
            block
            onClick={() => login({ variables: { ...formValue } })}
          >
            Login
          </Button>
        </Form>
      </FormStyled>
    </Panel>
  );
}

export default Login;
