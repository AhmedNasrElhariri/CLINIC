import React, { useState, useEffect } from 'react';
import { Form, Alert } from 'rsuite';
import { CRCard, CRSelectInput, Div, H6, CRButton } from 'components';
import { CHANGE_LANGUAGE } from 'apollo-client/queries';
import { useMutation } from '@apollo/client';
import useGlobalState from 'state';
import * as R from 'ramda';

const languages = [
  { id: 'ar', name: 'اللغه العربيه' },
  { id: 'en', name: 'English' },
];
const initialValues = {
  language: 'ar',
};

const ChangeLanguage = ({ t }) => {
  const [changeLanguage] = useMutation(CHANGE_LANGUAGE, {
    onCompleted({ changeLanguage: user }) {
      Alert.success('Language has been changed successfully');
      window.location.reload();
    },
    onError() {
      Alert.error('Failed to update the language');
    },
  });
  const [formValue, setFormValue] = useState(initialValues);
  const [user] = useGlobalState('user');
  useEffect(() => {
    const lang = R.prop('language')(user);
    setFormValue({ language: lang });
  }, [user]);
  return (
    <CRCard borderless>
      <Div mb={30} mt={30} display="flex" justifyContent="space-between">
        <H6 fontWeight="bold">{t('changeLanguage')}</H6>
        <CRButton
          variant="primary"
          onClick={() =>
            changeLanguage({
              variables: { lang: formValue.language },
            })
          }
        >
          {t('save')}
        </CRButton>
      </Div>
      <Div mt={10} display="flex">
        <Form fluid formValue={formValue} onChange={setFormValue}>
          <CRSelectInput
            name="language"
            data={languages}
            style={{ width: '200px' }}
            placement="top"
          />
        </Form>
      </Div>
    </CRCard>
  );
};

export default ChangeLanguage;
