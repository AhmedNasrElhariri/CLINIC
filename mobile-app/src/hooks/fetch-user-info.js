import { useEffect, useState, useCallback, useMemo } from 'react';
import {
  useLazyQuery,
  useSubscription,
  useMutation,
} from '@apollo/react-hooks';
import * as R from 'ramda';

import {
  MY_CLINICS,
  NOTIFICATION_SUBSCRIPTION,
  MY_NOTIFICATIONS,
  CLEAR_NOTIFICATIONS,
} from '@/apollo-client/queries';

import useAuth from '@/hooks/auth';
import useGlobalState from '@/state';

function useUserInfo({ onLogout } = {}) {
  const {
    isVerified,
    isAuthenticated,
    setAuthenticated,
    onLoginSucceeded,
    logout,
  } = useAuth({
    onLogout,
  });

  const [clinics, setClinics] = useState([]);
  const [getClinics, { data: clinicsList }] = useLazyQuery(MY_CLINICS);
  const [getNotifications, { data: notificationsData, refetch }] = useLazyQuery(
    MY_NOTIFICATIONS
  );

  useSubscription(NOTIFICATION_SUBSCRIPTION, {
    onSubscriptionData: () => refetch(),
  });

  const [user, setUser] = useGlobalState('user');
  const [currentClinic, setCurrentClinic] = useGlobalState('currentClinic');
  const [clearNotifications] = useMutation(CLEAR_NOTIFICATIONS, {
    update(cache, { data: { createRevenue: revenue } }) {
      cache.writeQuery({
        query: MY_NOTIFICATIONS,
        data: {
          myNotifications: [],
        },
      });
    },
  });

  const notifications = useMemo(() => {
    return R.propOr([], 'myNotifications')(notificationsData);
  }, [notificationsData]);

  useEffect(() => {
    if (isVerified && isAuthenticated) {
      getClinics();
      getNotifications();
    }
  }, [getClinics, getNotifications, isAuthenticated, isVerified]);

  useEffect(() => {
    const clinics = R.prop('myClinics')(clinicsList);
    if (clinics) {
      setClinics(clinics);
      if (R.isEmpty(currentClinic)) {
        const clinic = R.path(['0'])(clinics);
        setCurrentClinic(clinic);
      }
    }
  }, [clinicsList, currentClinic, setCurrentClinic]);

  const onLoginFailed = useCallback(() => {
    setAuthenticated(false);
  }, [setAuthenticated]);

  return {
    clinics,
    currentClinic,
    onLoginFailed,
    onLoginSucceeded,
    logout,
    clearNotifications,
    user,
    isVerified,
    isAuthenticated,
    notifications,
  };
}

export default useUserInfo;
