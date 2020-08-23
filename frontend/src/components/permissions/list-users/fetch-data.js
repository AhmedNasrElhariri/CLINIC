import { useMemo } from 'react';
import * as R from 'ramda';
import { useQuery } from '@apollo/client';

import { CLINIC_USERS } from 'apollo-client/queries';
import useGlobalState from 'state';
import { isAdmin } from 'services/auth';

export function useVariables() {
  const [currentClinic] = useGlobalState('currentClinic');
  if (!currentClinic) {
    return {};
  }
  return {
    clinicId: currentClinic.id,
  };
}

const useFetchClinicUsers = () => {
  const variables = useVariables();
  const { data } = useQuery(CLINIC_USERS, {
    variables,
  });

  const users = useMemo(
    () => R.pipe(R.propOr([], 'clinicUsers'), R.reject(isAdmin))(data),
    [data]
  );

  return useMemo(
    () => ({
      users,
    }),
    [users]
  );
};

export default useFetchClinicUsers;
