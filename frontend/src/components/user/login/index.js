import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Alert, Form, Schema } from 'rsuite';

import { Div, CRTextInput, CRButton, H1 } from 'components';
import { LOGIN } from 'apollo-client/queries';
import { CoverStyled } from './style';

const { StringType } = Schema.Types;

const subTitleClasses = '!text-lg lg:!text-5xl !font-normal uppercase';

const model = Schema.Model({
  type: StringType().isRequired('Appointment Type is required'),
  patient: StringType().isRequired('Patient Type is required'),
});

const initialValues = {
  email: '',
  password: '',
};

export default function Login({ onLoginSucceeded, onLoginFailed }) {
  const [formValue, setFormValue] = useState(initialValues);

  const [login] = useMutation(LOGIN, {
    onCompleted: ({ login: { token, user } }) => {
      Alert.success('Your Logged Successfully');
      onLoginSucceeded({ token, user });
    },
    onError: () => {
      Alert.error('Invalid Input');
      onLoginFailed();
    },
  });

  return (
    <Div
      display="flex"
      width="100%"
      height="100vh"
      style={{ direction: 'ltr' }}
    >
      <Div className="mt-10 items-center grow inline-flex flex-col">
        <Div
          className="max-w-md w-full px-5 flex flex-col justify-center
        items-center lg:items-start"
        >
          <div className="lg:my-10 text-center">
            <Div as="img" src="logo.png" alt="" width="auto" />
          </div>
          <Div
            className="flex text-lg gap-2 
          mt-6 lg:mt-0 lg:mb-3
          items-center lg:items-start
          lg:flex-col"
          >
            <H1 variant="primary" className={subTitleClasses}>
              Appointments
            </H1>
            <span className="lg:hidden">-</span>
            <H1 variant="dark" className={subTitleClasses}>
              Reports
            </H1>
            <span className="lg:hidden">-</span>
            <H1 variant="dark" className={subTitleClasses}>
              Agenda
            </H1>
          </Div>
          <Form
            className="max-w-md w-full py-3"
            fluid
            model={model}
            formValue={formValue}
            onChange={value => setFormValue(value)}
          >
            <CRTextInput placeholder="Enter Email" name="email" />
            <CRTextInput
              placeholder="Enter Password"
              name="password"
              type="password"
            />
            <CRButton
              className="mt-3"
              block
              bold
              uppercase
              variant="primary"
              onClick={() => login({ variables: { ...formValue } })}
            >
              LOG IN
            </CRButton>
          </Form>
        </Div>
      </Div>
      <CoverStyled className="grow-[2] lg:grow-[1.375] tw-hidden md:block" />
    </Div>
  );
}
