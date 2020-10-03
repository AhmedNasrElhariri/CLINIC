import { useEffect, useState, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useSubscription, useMutation } from '@apollo/client';
import * as ls from 'services/local-storage';
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
import { filterUpdatapleFields } from 'services/clinic';

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
    setCurrentClinic(ls.getCurrentClinic());
  }, [setCurrentClinic]);

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
      if (R.isEmpty(currentClinic)) {
        const clinic = R.path(['0'])(clinics);
        setCurrentClinic(filterUpdatapleFields(clinic));
        ls.setCurrentClinic(clinic);
      }
    }
  }, [clinicsList, currentClinic, data, setActiveView, setCurrentClinic]);

  const onLoginSucceeded = useCallback(
    ({ token, user }) => {
      ls.setUserToken(token);
      setAuthenticated(true);
      setUser(user);
      updatePermissions(user.permissions);
    },
    [setAuthenticated, setUser, updatePermissions]
  );

  const onLoginFailed = useCallback(() => {
    ls.removeUserToken(ACCESS_TOKEN);
    setAuthenticated(false);
  }, [setAuthenticated]);

  const logout = useCallback(() => {
    ls.removeUserToken(ACCESS_TOKEN);
    setAuthenticated(false);
    window.location.reload();
  }, [setAuthenticated]);

  const onSelectClinic = clinic => {
    setCurrentClinic(filterUpdatapleFields(clinic));
    ls.setCurrentClinic(clinic);
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
