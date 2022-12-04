import React, { useState, useEffect, useCallback } from 'react';
import { Form, Alert } from 'rsuite';
import { CRCard, CRSelectInput, Div, H6, CRButton } from 'components';
import { CHANGE_LANGUAGE } from 'apollo-client/queries';
import { useMutation } from '@apollo/client';
import useGlobalState from 'state';
import * as R from 'ramda';
import { useTranslation } from 'react-i18next';

const languages = [
  { id: 'ar', name: 'اللغه العربيه' },
  { id: 'en', name: 'English' },
];
const initialValues = {
  language: 'ar',
};

const ChangeLanguage = ({ t }) => {
  const [formValue, setFormValue] = useState(initialValues);
  const { i18n } = useTranslation();
  const language = i18n?.language;

  useEffect(() => {
    setFormValue({ language });
  }, [language]);

  const changeLanguage = useCallback(() => {
    localStorage.setItem('i18nextLng', formValue.language);
    window.location.reload();
  }, [formValue]);

  return (
    <CRCard borderless>
      <Div mb={30} mt={30} display="flex" justifyContent="space-between">
        <H6 fontWeight="bold">{t('changeLanguage')}</H6>
        <CRButton variant="primary" onClick={changeLanguage}>
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
