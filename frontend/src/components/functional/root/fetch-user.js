import { useEffect, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import * as R from 'ramda';

import {
  ACTIVE_VIEWS,
  // MY_NOTIFICATIONS,
  // CLEAR_NOTIFICATIONS,
  ACTIVE_PATIENT_VIEWS,
} from 'apollo-client/queries';
import {
  removeUserToken,
  set,
  setUserToken,
} from '../../../services/local-storage';
import { useAuth } from 'hooks';
import useGlobalState from 'state';

function useUserProfile() {
  const { isVerified, isAuthenticated, setAuthenticated, updatePermissions } =
    useAuth();

  const [getViews, { data }] = useLazyQuery(ACTIVE_VIEWS);
  const [getPatientViews, { data: patientViewsData }] =
    useLazyQuery(ACTIVE_PATIENT_VIEWS);
  // const [getNotifications, { data: notificationsData, refetch }] =
  //   useLazyQuery(MY_NOTIFICATIONS);
  // useSubscription(NOTIFICATION_SUBSCRIPTION, {
  //   onSubscriptionData: () => refetch(),
  // });

  const [_, setActiveViews] = useGlobalState('activeViews');
  const [__, setActivePatientViews] = useGlobalState('activePatientViews');
  const [user, setUser] = useGlobalState('user');
  // const [clearNotifications] = useMutation(CLEAR_NOTIFICATIONS, {
  //   update(cache, { data: { createRevenue: revenue } }) {
  //     cache.writeQuery({
  //       query: MY_NOTIFICATIONS,
  //       data: {
  //         myNotifications: [],
  //       },
  //     });
  //   },
  // });

  // const notifications = useMemo(() => {
  //   return R.propOr([], 'myNotifications')(notificationsData);
  // }, [notificationsData]);

  useEffect(() => {
    if (isVerified && isAuthenticated) {
      getViews();
      getPatientViews();
      // getNotifications();
    }
  }, [isAuthenticated, isVerified]);

  useEffect(() => {
    const views = R.prop('activeViews')(data);
    if (views) {
      const normalizedView = R.pipe(
        R.groupBy(R.prop('type')),
        R.map(R.prop('0'))
      )(views);
      setActiveViews(normalizedView);
    }
  }, [data]);

  useEffect(() => {
    const patientViews = R.prop('activePatientViews')(patientViewsData);
    if (patientViews) {
      setActivePatientViews(patientViews);
    }
  }, [patientViewsData]);

  const onLoginSucceeded = useCallback(
    ({ token, user }) => {
      setUserToken(token);
      setAuthenticated(true);
      set('user', user);
      setUser(user);
      updatePermissions(user);
    },
    [setAuthenticated, setUser, updatePermissions]
  );

  const onLoginFailed = useCallback(() => {
    removeUserToken();
    setAuthenticated(false);
  }, [setAuthenticated]);

  const logout = useCallback(() => {
    removeUserToken();
    setAuthenticated(false);
    window.location.reload();
  }, [setAuthenticated]);

  return {
    onLoginFailed,
    onLoginSucceeded,
    logout,
    user,
    isVerified,
    isAuthenticated,
    // notifications,
    // clearNotifications,
  };
}

export default useUserProfile;
