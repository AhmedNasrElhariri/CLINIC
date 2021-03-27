import { useMemo } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import * as R from 'ramda';

import { LIST_PATIENT_SURGERIES, GET_APPOINTMENT } from 'apollo-client/queries';

function useSuergriesAppointments({ patientId }) {
  const { data: patientSurgeries } = useQuery(LIST_PATIENT_SURGERIES, {
    variables: { patientId },
  });
  const surgeries = useMemo(
    () => R.propOr([], 'patientSurgeries')(patientSurgeries),
    [patientSurgeries]
  );
  const [
    fetchAppointment,
    { data: appointmentData },
  ] = useLazyQuery(GET_APPOINTMENT, { fetchPolicy: 'no-cache' });
  const appointment = useMemo(
    () => R.propOr([], 'appointment')(appointmentData),
    [appointmentData]
  );

  return useMemo(
    () => ({
      surgeries,
      fetchAppointment: surgeryId =>
        fetchAppointment({ variables: { surgeryId } }),
      appointment,
    }),
    [appointment, fetchAppointment, surgeries]
  );
}

export default useSuergriesAppointments;
