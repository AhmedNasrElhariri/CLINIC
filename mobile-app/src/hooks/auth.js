import { useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useMutation } from '@apollo/react-hooks';

import { VERIFY } from '@/apollo-client/queries';
import useGlobalState from '@/state';
import { AUTH_TOKEN } from '@/utils/constants';

const useAuth = ({ onLogout } = {}) => {
  const [userToken, setUserToken] = useGlobalState('userToken');
  const [isAuthenticated, setAuthenticated] = useGlobalState('isAuthenticated');
  const [isVerified, setVerified] = useGlobalState('isVerified');
  const [user, setUser] = useGlobalState('user');

  const [verify] = useMutation(VERIFY, {
    fetchPolicy: 'no-cache',
    onCompleted({ verify: user }) {
      setAuthenticated(true);
      setUser(user);
      setVerified(true);
    },
    onError() {
      setVerified(true);
    },
  });

  useEffect(() => {
    (async () => {
      let token = await AsyncStorage.getItem(AUTH_TOKEN);

      if (token) {
        token = JSON.parse(token);
      } else {
        token = null;
      }

      setUserToken(token);
      verify({ variables: { token } });
    })();
  }, [setUserToken, verify]);

  const logout = useCallback(async () => {
    await AsyncStorage.clear();
    setAuthenticated(false);
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
      user,
      logout,
      onLogout,
      setAuthenticated,
      onLoginSucceeded,
      token: userToken,
    }),
    [
      isVerified,
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
