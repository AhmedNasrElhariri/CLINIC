import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import * as R from 'ramda';
import { LIST_USERS } from 'apollo-client/queries';
const useUsers = ({ action }) => {
  const { data: userData } = useQuery(LIST_USERS, {
    variables: { action: action },
  });
  const users = useMemo(() => R.propOr([], 'listUsers')(userData), [userData]);
  return useMemo(
    () => ({
      users,
    }),
    [users]
  );
};
export default useUsers;
