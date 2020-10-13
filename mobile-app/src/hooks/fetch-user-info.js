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

import useGlobalState from '@/state';

function useUserInfo() {
  const [isAuthenticated] = useGlobalState('isAuthenticated');
  const [clinics, setClinics] = useState([]);
  const [getClinics, { data: clinicsList }] = useLazyQuery(MY_CLINICS);
  const [
    getNotifications,
    { data: notificationsData, refetch, networkStatus },
  ] = useLazyQuery(MY_NOTIFICATIONS);

  useSubscription(NOTIFICATION_SUBSCRIPTION, {
    onSubscriptionData: () => refetch(),
  });

  const [user] = useGlobalState('user');
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
    if (isAuthenticated) {
      getClinics();
      getNotifications();
    }
  }, [getClinics, getNotifications, isAuthenticated]);

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

  return useMemo(
    () => ({
      clinics,
      currentClinic,
      clearNotifications,
      user,
      notifications,
      refetchNotfications: refetch,
      fetchDone: networkStatus === 7,
      refetching: networkStatus === 4,
    }),
    [
      clinics,
      currentClinic,
      clearNotifications,
      networkStatus,
      user,
      refetch,
      notifications,
    ]
  );
}

export default useUserInfo;
