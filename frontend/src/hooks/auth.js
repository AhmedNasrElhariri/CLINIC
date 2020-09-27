import { useEffect } from 'react';
import { VERIFY } from 'apollo-client/queries';
import { useMutation } from '@apollo/client';
import { useAbility } from '@casl/react';
import { ACCESS_TOKEN } from '../utils/constants';

import useGlobalState from 'state';
import { AbilityContext } from 'components/user/can';

const useAuth = () => {
  const [isAuthenticated, setAuthenticated] = useGlobalState('isAuthenticated');
  const [isVerified, setVerified] = useGlobalState('isVerified');
  const [user, setUser] = useGlobalState('user');

  const ability = useAbility(AbilityContext);

  const [verify] = useMutation(VERIFY, {
    fetchPolicy: 'no-cache',
    onCompleted({ verify: user }) {
      setAuthenticated(true);
      setUser(user);
      setVerified(true);
      ability.update(user.permissions);
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
    updatePermissions: permissions => {
      ability.update(permissions);
    },
    isAdmin: ability.can('manage', 'all'),
    can: (action, subject) => ability.can(action, subject),
  };
};

export default useAuth;
