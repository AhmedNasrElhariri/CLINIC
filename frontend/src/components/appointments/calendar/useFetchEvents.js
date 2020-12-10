import { useMemo } from 'react';
import * as R from 'ramda';

import jsonData from './data.json';

export default function useFetchEvents() {
  const data = jsonData;

  const events = useMemo(
    () =>
      R.pipe(
        R.propOr([], 'events'),
        R.reject(R.propEq('status', 'Cancelled'))
      )(data),
    [data]
  );

  const branches = useMemo(() => R.pipe(R.propOr([], 'branches'))(data), [
    data,
  ]);

  const specializations = useMemo(
    () => R.pipe(R.propOr([], 'specializations'))(data),
    [data]
  );

  const doctors = useMemo(() => R.pipe(R.propOr([], 'doctors'))(data), [data]);

  return useMemo(
    () => ({
      events,
      branches,
      specializations,
      doctors,
    }),
    [events, branches, specializations, doctors]
  );
}
