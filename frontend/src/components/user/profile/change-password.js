import React, { useState } from 'react';
import { Form, Schema, Alert } from 'rsuite';

import { CRCard, CRTextInput, Div, H6, CRButton } from 'components';
import { CHANGE_PASSWORD } from 'apollo-client/queries';
import { useMutation } from '@apollo/client';

const { StringType } = Schema.Types;

const model = Schema.Model({
  type: StringType().isRequired('Appointment Type is required'),
  patient: StringType().isRequired('Patient Type is required'),
});

const initialValues = {
  currentPassword: '',
  newPassword: '',
};

const ChangePassword = () => {
  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted({ createExpense: expnese }) {
      Alert.success('Password Added Successfully');
    },
    onError() {
      Alert.error('Failed to update password');
    },
  });
  const [formValue, setFormValue] = useState(initialValues);

  return (
    <CRCard borderless>
      <Div mb={40} display="flex" justifyContent="space-between">
        <H6 fontWeight="bold">Change Password</H6>
        <CRButton
          small
          primary
          onClick={() =>
            changePassword({
              variables: formValue,
            })
          }
        >
          Save
        </CRButton>
      </Div>
      <Form fluid model={model} formValue={formValue} onChange={setFormValue}>
        <CRTextInput type="password" label="Current Password" name="currentPassword" block />
        <CRTextInput type="password" label="New Password" name="newPassword" block />
      </Form>
    </CRCard>
  );
};

export default ChangePassword;
