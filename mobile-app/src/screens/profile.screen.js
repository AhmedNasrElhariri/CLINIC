import React from 'react';

import { CRMainLayout, CRText, CRButton } from '@/components';
import useAuth from '@/hooks/auth';
import { NAVIGATIONS } from '@/utils/constants';

const ProfileScreen = ({ navigation }) => {
  const { logout } = useAuth({
    onLogout: () => {
      navigation.navigate(NAVIGATIONS.LOGIN);
    },
  });

  return (
    <CRMainLayout header="Profile">
      <CRText size={20} weight="bold">
        Login Info
      </CRText>
      <CRButton transparent size={16} onPress={logout}>
        Logout
      </CRButton>
    </CRMainLayout>
  );
};

export default ProfileScreen;
