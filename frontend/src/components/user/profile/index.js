import React from 'react';
import { MainContainer } from 'components';
import ChangePassword from './change-password';
import ChangeAvatar from './change-avatar';
import { useTranslation } from 'react-i18next';

const Profile = () => {
  const { t } = useTranslation();
  return (
    <>
      <MainContainer title={t('profile')} nobody></MainContainer>
      <ChangeAvatar t={t}/>
      <ChangePassword t={t}/>
    </>
  );
};

export default Profile;
