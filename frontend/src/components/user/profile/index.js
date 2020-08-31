import React from 'react';

import { MainContainer } from 'components';
import ChangePassword from './change-password';

const Profile = () => (
  <>
    <MainContainer title="Profile" nobody></MainContainer>
    <ChangePassword />
  </>
);

export default Profile;
