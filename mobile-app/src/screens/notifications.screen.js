import React from 'react';
import { RefreshControl } from 'react-native';

import useUserInfo from '@/hooks/fetch-user-info';
import { CRMainLayout, CRButton } from '@/components';
import Notification from '@/components/notifications/notification';
import crVariables from '@/utils/cr-variables';

const NotificationScreen = () => {
  const {
    notifications,
    clearNotifications,
    refetchNotfications,
    refetching,
  } = useUserInfo();

  return (
    <CRMainLayout
      header="Notifications"
      extra={
        <CRButton
          primary
          size={14}
          transparent
          textStyle={{ color: crVariables.primaryColor }}
          onPress={clearNotifications}
        >
          Clear
        </CRButton>
      }
      refreshControl={
        <RefreshControl
          onRefresh={() => refetchNotfications()}
          refreshing={refetching}
        />
      }
    >
      {notifications.map((n, idx) => (
        <Notification key={idx} {...n} />
      ))}
    </CRMainLayout>
  );
};

export default NotificationScreen;
