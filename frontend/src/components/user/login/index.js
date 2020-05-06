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

function Login() {
  const [formValue, SetFormValue] = useState(initialValues);

  const [login] = useMutation(LOGIN, {
    onCompleted: () => {
      Alert.success('Your Logged Successfully');
    },
    onError: () => Alert.error('Invalid Input'),
  });

  return (
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
  );
}

export default Login;
