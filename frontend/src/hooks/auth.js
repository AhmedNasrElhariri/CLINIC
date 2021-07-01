import { useEffect } from 'react';
import { VERIFY } from 'apollo-client/queries';
import { useMutation } from '@apollo/client';
import { useAbility } from '@casl/react';
import { POSITIONS, ACCESS_TOKEN } from '../utils/constants';
import useGlobalState from 'state';
import { AbilityContext } from 'components/user/can';

const useAuth = () => {
  const [isAuthenticated, setAuthenticated] = useGlobalState('isAuthenticated');
  const [isVerified, setVerified] = useGlobalState('isVerified');
  const [user, setUser] = useGlobalState('user');
  const ability = useAbility(AbilityContext);

  const updatePermissions = user => {
    let permissions;
    console.log(user)
    if (user.position === 'Admin') {
      permissions = [
        {
          action: 'manage',
          subject: 'all',
        },
      ];
    } else {
      permissions = [...user.role.permissions];
    }
    ability.update(permissions);
  };

  const [verify] = useMutation(VERIFY, {
    fetchPolicy: 'no-cache',
    onCompleted({ verify: user }) {
      setAuthenticated(true);
      setUser(user);
      updatePermissions(user);
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
    updatePermissions,
    isAdmin: user && user.position === POSITIONS.ADMIN,
    isOrAssistant:
      user &&
      (user.position === POSITIONS.ADMIN ||
        user.position === POSITIONS.ASSISTANT),
    can: (action, subject) => ability.can(action, subject),
  };
};

export default useAuth;
