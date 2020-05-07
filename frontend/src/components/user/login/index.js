import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useHistory } from 'react-router-dom';
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
import { ACCESS_TOKEN } from 'utils/constants';
import useGlobalState from 'state';

const { StringType } = Schema.Types;

const model = Schema.Model({
  type: StringType().isRequired('Appointment Type is required'),
  patient: StringType().isRequired('Patient Type is required'),
});

const initialValues = {
  email: '',
  password: '',
};

function Login() {
  const [isAuthenticated, setAuthenticated] = useGlobalState('isAuthenticated');
  const [formValue, SetFormValue] = useState(initialValues);

  const [login] = useMutation(LOGIN, {
    onCompleted: ({ login: { token } }) => {
      Alert.success('Your Logged Successfully');
      localStorage.setItem(ACCESS_TOKEN, token);
      setAuthenticated(true);
    },
    onError: () => {
      Alert.error('Invalid Input');
      setAuthenticated(false);
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
