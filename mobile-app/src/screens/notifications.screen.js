import React from 'react';
import { Text } from 'native-base';
import * as R from 'ramda';

import useUserInfo from '@/hooks/fetch-user-info';
import { CRMainLayout } from '@/components';
import Notification from '@/components/notifications/notification';

const NotificationScreen = ({ route }) => {
  const { notifications } = useUserInfo();

  return (
    <CRMainLayout header="Notifications">
      {notifications.map((n, idx) => (
        <Notification key={idx} {...n} />
      ))}
    </CRMainLayout>
  );
};

export default NotificationScreen;
