import { useQuery } from '@apollo/react-hooks';
import * as R from 'ramda';

import { LIST_APPOINTMENTS } from 'apollo-client/queries';
import { getStartOfDay, getEndOfDay } from 'services/date.service';
import useGlobalState from 'state';
import { useMemo } from 'react';

export function useVariables() {
  const [currentClinic] = useGlobalState('currentClinic');
  if (!currentClinic) {
    return {};
  }
  return {
    clinicIds: [currentClinic.id],
    fromDate: getStartOfDay(new Date()),
    toDate: getEndOfDay(new Date()),
  };
}

function FetchAppointments(variables) {
  const mergerdVariables = { ...useVariables(), ...variables };

  const { data } = useQuery(LIST_APPOINTMENTS, {
    variables: { input: mergerdVariables },
    fetchPolicy: 'cache-and-network',
  });
  return useMemo(()=>R.propOr([], 'appointments')(data),[data]) ;
}

export default FetchAppointments;
