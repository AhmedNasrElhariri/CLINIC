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

const ChangePassword = ({ t }) => {
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
      <Div mb={30} display="flex" justifyContent="space-between">
        <H6 fontWeight="bold">{t('changePassword')}</H6>
        <CRButton
          variant="primary"
          onClick={() =>
            changePassword({
              variables: formValue,
            })
          }
        >
          {t('save')}
        </CRButton>
      </Div>
      <Form fluid model={model} formValue={formValue} onChange={setFormValue}>
        <CRTextInput
          type="password"
          label={t('currentPassword')}
          name="currentPassword"
          block
        />
        <CRTextInput
          type="password"
          label={t('newPassword')}
          name="newPassword"
          block
        />
      </Form>
    </CRCard>
  );
};

export default ChangePassword;
