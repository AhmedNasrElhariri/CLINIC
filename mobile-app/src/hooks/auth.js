import { useEffect, useCallback, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useMutation } from '@apollo/react-hooks';

import { VERIFY } from '@/apollo-client/queries';
import useGlobalState from '@/state';
import { AUTH_TOKEN } from '@/utils/constants';
import client from '@/apollo-client/client';

const useAuth = ({ onLogout } = {}) => {
  const [userToken, setUserToken] = useGlobalState('userToken');
  const [isAuthenticated, setAuthenticated] = useGlobalState('isAuthenticated');
  const [isVerified, setVerified] = useGlobalState('isVerified');
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useGlobalState('user');

  const [verify] = useMutation(VERIFY, {
    fetchPolicy: 'no-cache',
    onCompleted({ verify: user }) {
      setAuthenticated(true);
      setUser(user);
      setInitializing(false);
    },
    onError() {
      setInitializing(false);
    },
  });

  useEffect(() => {
    if (isVerified) {
      return;
    }
    (async () => {
      let token = await AsyncStorage.getItem(AUTH_TOKEN);

      if (token) {
        token = JSON.parse(token);
      } else {
        token = null;
      }
      setUserToken(token);
      verify({ variables: { token } });
      setVerified(true);
    })();
  }, [setUserToken, setVerified, isVerified, verify]);

  const logout = useCallback(async () => {
    await AsyncStorage.clear();
    setAuthenticated(false);
    client.resetStore();
    if (onLogout) {
      onLogout();
    }
  }, [setAuthenticated, onLogout]);

  const onLoginSucceeded = useCallback(
    ({ user, token }) => {
      setAuthenticated(true);
      setVerified(true);
      setUser(user);
      AsyncStorage.setItem(AUTH_TOKEN, JSON.stringify(token));
    },
    [setAuthenticated, setVerified, setUser]
  );

  return useMemo(
    () => ({
      isAuthenticated,
      isVerified,
      initializing,
      user,
      logout,
      onLogout,
      setAuthenticated,
      onLoginSucceeded,
      token: userToken,
    }),
    [
      isVerified,
      initializing,
      logout,
      user,
      onLogout,
      setAuthenticated,
      isAuthenticated,
      onLoginSucceeded,
      userToken,
    ]
  );
};

export default useAuth;
