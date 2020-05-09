import React, { useState, useEffect } from 'react';
import { VERIFY } from 'apollo-client/queries';
import { useMutation } from '@apollo/react-hooks';
import { ACCESS_TOKEN } from '../utils/constants';

import useGlobalState from 'state';

export default () => {
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
    verify({ variables: { token: localStorage.getItem(ACCESS_TOKEN) } });
  }, [verify]);

  return {
    isAuthenticated,
    isVerified,
    user,
    setAuthenticated,
  };
};
