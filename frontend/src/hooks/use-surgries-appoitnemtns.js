import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import * as R from 'ramda';

import {
  LIST_PATIENT_SURGERIES,
  GET_SURGRIES_APPOINTMENT,
} from 'apollo-client/queries';

function useSuergriesAppointments({ patientId }) {
  const { data: patientSurgeries } = useQuery(LIST_PATIENT_SURGERIES, {
    variables: { patientId },
  });
  const surgeries = useMemo(
    () => R.propOr([], 'patientSurgeries')(patientSurgeries),
    [patientSurgeries]
  );
  // const { data } = useQuery(GET_SURGRIES_APPOINTMENT, {
  //   variables: {
  //     patientId,
  //   },
  //   // onCompleted: () => setFetched(true),
  // });
  // const surgires = useMemo(() => R.propOr([], 'surgriesAppointments')(data), [
  //   data,
  // ]);

  // const appointments = useMemo(
  //   () =>
  //     R.pipe(
  //       R.propOr([], 'appointments'),
  //       R.reject(R.propEq('status', 'Cancelled')),
  //       R.reject(R.propEq('type', APPT_TYPE.Surgery)),
  //       sortAppointmentsByDate
  //     )(data),
  //   [data]
  // );

  return useMemo(
    () => ({
      surgeries,
    }),
    [surgeries]
  );
}

export default useSuergriesAppointments;
