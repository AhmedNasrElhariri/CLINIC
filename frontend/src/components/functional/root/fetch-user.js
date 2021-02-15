import { useEffect, useState, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { useLazyQuery, useSubscription, useMutation } from '@apollo/client';
import * as R from 'ramda';

import * as ls from 'services/local-storage';
import {
  ACTIVE_VIEWS,
  NOTIFICATION_SUBSCRIPTION,
  MY_NOTIFICATIONS,
  CLEAR_NOTIFICATIONS,
} from 'apollo-client/queries';
import { ACCESS_TOKEN } from 'utils/constants';

import useAuth from 'hooks/auth';
import useGlobalState from 'state';
import useFetchPatients from 'hooks/use-patients';
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
  const [getViews, { data }] = useLazyQuery(ACTIVE_VIEWS);
  const [getNotifications, { data: notificationsData, refetch }] = useLazyQuery(
    MY_NOTIFICATIONS
  );
  useSubscription(NOTIFICATION_SUBSCRIPTION, {
    onSubscriptionData: () => refetch(),
  });
  // const { patients } = useFetchPatients();

  const [_, setActiveViews] = useGlobalState('activeViews');
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
      getViews();
      getNotifications();
    }
  }, [data, getNotifications, getViews, isAuthenticated, isVerified]);

  useEffect(() => {
    const views = R.prop('activeViews')(data);
    if (views) {
      const normalizedView = R.pipe(
        R.groupBy(R.prop('type')),
        R.map(R.prop('0'))
      )(views);
      setActiveViews(normalizedView);
    }
    if (clinics) {
      setClinics(clinics);
      if (R.isEmpty(currentClinic) || R.isNil(currentClinic)) {
        const clinic = R.path(['0'])(clinics);
        setCurrentClinic(filterUpdatapleFields(clinic));
        ls.setCurrentClinic(clinic);
      }
    }
  }, [clinics, currentClinic, data, setActiveViews, setCurrentClinic]);

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
    // patients,
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
