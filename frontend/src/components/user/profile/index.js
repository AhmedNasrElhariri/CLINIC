import React from 'react';

import { MainContainer } from 'components';
import ChangePassword from './change-password';
import ChangeAvatar from './change-avatar';

const Profile = () => (
  <>
    <MainContainer title="Profile" nobody></MainContainer>
    <ChangeAvatar />
    <ChangePassword />
  </>
);

export default Profile;
