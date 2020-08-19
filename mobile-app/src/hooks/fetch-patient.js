import { useMemo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import * as R from 'ramda';

import { GET_PATIENT, GET_APPOINTMENT_HISTORY } from '@/apollo-client/queries';

function useFetchPatient(id) {
  const { data } = useQuery(GET_PATIENT, { variables: { id } });
  const result = useQuery(GET_APPOINTMENT_HISTORY, { variables: { id } });
  const patient = useMemo(() => R.propOr({}, 'patient')(data), [data]);

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

  const summary = useMemo(
    () =>
      R.pipe(
        R.pathOr([], ['data', 'appointmentHistory']),
        R.map(R.prop('data')),
        R.map(
          R.pipe(
            R.map(({ field: { name }, value }) => ({ [name]: value })),
            R.mergeAll
          )
        )
      )(result),
    [result]
  );

  const progress = useMemo(() => {
    const progressWithDate = R.pipe(
      R.pathOr([], ['data', 'appointmentHistory']),
      R.map(({ date, data }) => {
        return {
          date,
          data: R.pipe(
            R.map(({ field: { name }, value }) => ({ [name]: value })),
            R.mergeAll
          )(data),
        };
      })
    )(result);

    return R.pipe(
      R.map(f => ({
        [f]: R.map(({ date, data }) => ({
          value: R.path([f])(data),
          date,
        }))(progressWithDate),
      })),
      R.mergeAll
    )(fields);
  }, [fields, result]);

  return useMemo(
    () => ({
      patient,
      summary,
      progress,
    }),
    [patient, summary, progress]
  );
}

export default useFetchPatient;
