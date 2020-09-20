import { useEffect, useState, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useSubscription, useMutation } from '@apollo/client';
import {
  ACTIVE_VIEW,
  MY_CLINICS,
  NOTIFICATION_SUBSCRIPTION,
  MY_NOTIFICATIONS,
  CLEAR_NOTIFICATIONS,
} from 'apollo-client/queries';
import { ACCESS_TOKEN } from 'utils/constants';
import * as R from 'ramda';

import useAuth from 'hooks/auth';
import useGlobalState from 'state';
import useFetchPatients from 'hooks/fetch-patients';

function useUserProfile() {
  const {
    isVerified,
    isAuthenticated,
    setAuthenticated,
    updatePermissions,
  } = useAuth();

  const history = useHistory();
  const [clinics, setClinics] = useState([]);
  const [getView, { data }] = useLazyQuery(ACTIVE_VIEW);
  const [getClinics, { data: clinicsList }] = useLazyQuery(MY_CLINICS);
  const [getNotifications, { data: notificationsData, refetch }] = useLazyQuery(
    MY_NOTIFICATIONS
  );
  useSubscription(NOTIFICATION_SUBSCRIPTION, {
    onSubscriptionData: () => refetch(),
  });
  const { patients } = useFetchPatients();

  const [_, setActiveView] = useGlobalState('activeView');
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
      getView();
      getClinics();
      getNotifications();
    }
  }, [
    data,
    getClinics,
    getNotifications,
    getView,
    isAuthenticated,
    isVerified,
  ]);

  useEffect(() => {
    const activeView = R.prop('activeView')(data);
    const clinics = R.prop('myClinics')(clinicsList);
    if (activeView) {
      setActiveView(activeView);
    }
    if (clinics) {
      setClinics(clinics);
      setCurrentClinic(R.path(['0'])(clinics));
    }
  }, [clinicsList, data, setActiveView, setCurrentClinic]);

  const onLoginSucceeded = useCallback(
    ({ token, user }) => {
      localStorage.setItem(ACCESS_TOKEN, token);
      setAuthenticated(true);
      setUser(user);
      updatePermissions(user.permissions);
    },
    [setAuthenticated, setUser, updatePermissions]
  );

  const onLoginFailed = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
  }, [setAuthenticated]);

  const logout = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN);
    setAuthenticated(false);
    window.location.reload();
  }, [setAuthenticated]);

  const onSelectClinic = clinic => {
    setCurrentClinic(clinic);
    history.push('/');
  };

  return {
    clinics,
    currentClinic,
    patients,
    onLoginFailed,
    onLoginSucceeded,
    logout,
    onSelectClinic,
    user,
    isVerified,
    isAuthenticated,
    notifications,
    clearNotifications,
  };
}

export default useUserProfile;
