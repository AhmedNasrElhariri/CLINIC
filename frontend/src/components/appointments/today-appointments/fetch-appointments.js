import { useQuery } from '@apollo/react-hooks';
import * as R from 'ramda';

import { LIST_APPOINTMENTS } from 'apollo-client/queries';
import { getStartOfDay, getEndOfDay } from 'services/date.service';
import useGlobalState from 'state';

export function useVariables() {
  const [currentClinic] = useGlobalState('currentClinic');
  if (!currentClinic) {
    return {};
  }
  return {
    input: {
      clinicIds: [currentClinic.id],
      fromDate: getStartOfDay(new Date()),
      toDate: getEndOfDay(new Date()),
    },
  };
}

function AppointmentCalendar() {
  const variables = useVariables();

  const { data } = useQuery(LIST_APPOINTMENTS, {
    variables,
    fetchPolicy: 'cache-and-network',
  });
  return R.propOr([], 'appointments')(data);
}

export default AppointmentCalendar;
