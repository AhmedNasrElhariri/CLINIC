import { useMemo } from 'react';
import * as R from 'ramda';
import { useQuery, useMutation } from '@apollo/client';

import { USER, UPDATE_USER_PERMISSIONS } from 'apollo-client/queries';
import { Alert } from 'rsuite';

const useFetchUser = id => {
  const variables = { id };
  const { data } = useQuery(USER, {
    variables,
  });

  const [setUserPermissions] = useMutation(UPDATE_USER_PERMISSIONS, {
    onCompleted: () => {
      Alert.success('Permissions has been update successfully');
    },
  });

  const user = useMemo(() => R.propOr({}, 'user')(data), [data]);
  const permissions = useMemo(() => R.propOr([], 'permissions')(user), [user]);

  return useMemo(
    () => ({
      user,
      permissions,
      setUserPermissions: (userId, permissions) => {
        setUserPermissions({ variables: { userId, permissions } });
      },
    }),
    [permissions, setUserPermissions, user]
  );
};

export default useFetchUser;
