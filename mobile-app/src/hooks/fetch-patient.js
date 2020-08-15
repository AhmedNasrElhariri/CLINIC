import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as R from 'ramda';
import moment from 'moment';

import { GET_PATIENT, GET_APPOINTMENT_HISTORY } from '@/apollo-client/queries';
import useGlobalState from '@/state';
import client from '@/apollo-client/client';

import { sortAppointmentsByDate } from '@/services/appointment';

export function useVariables() {
  const [currentClinic] = useGlobalState('currentClinic');
  if (!currentClinic) {
    return {};
  }
  return {
    // input: {
    //   // clinicIds: [currentClinic.id],
    //   // clinicIds: ['ac9821c3-9a54-4dad-a0ef-dc3bb684d5e4'],
    // },
  };
}

const pickPath = R.curry((paths, obj) =>
  R.reduce((o, p) => R.assocPath(p, R.path(p, obj), o), {}, paths)
);

function useFetchPatient(id) {
  const { data } = useQuery(GET_PATIENT, { variables: { id } });
  const result = useQuery(GET_APPOINTMENT_HISTORY, { variables: { id } });
  const patient = useMemo(() => R.propOr({}, 'patient')(data), [data]);
  const summary = useMemo(
    () =>
      R.pipe(
        R.pathOr([], ['data', 'appointmentHistory']),
        R.map(R.prop('data')),
        R.map(R.map(({ field: { name }, value }) => ({ name, value })))
      )(result),
    [result]
  );
  const fields = useMemo(
    () =>
      R.pipe(
        R.pathOr([], ['data', 'appointmentHistory']),
        R.map(R.prop('data')),
        R.map(R.map(R.path(['field', 'name']))),
        R.reduce(R.concat, []),
        R.uniq
      )(result),
    [result]
  );

  return useMemo(
    () => ({
      patient,
      summary,
      fields,
    }),
    [patient, summary, fields]
  );
}

export default useFetchPatient;
