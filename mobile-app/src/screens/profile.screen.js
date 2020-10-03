import React from 'react';

import { CRMainLayout, CRText, CRButton } from '@/components';
import useUserInfo from '@/hooks/fetch-user-info';
import { NAVIGATIONS } from '@/utils/constants';

const ProfileScreen = ({ navigation }) => {
  const { logout } = useUserInfo({
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
