import { useMemo } from 'react';
import * as R from 'ramda';
import { useQuery } from '@apollo/react-hooks';

import { LIST_PATIENTS, LIST_APPOINTMENTS } from 'apollo-client/queries';
import useGlobalState from 'state';

export default function NewAppointment() {
  const [currentClinic] = useGlobalState('currentClinic');

  const { data: patientsData } = useQuery(LIST_PATIENTS);
  const { data: appointmentsData } = useQuery(LIST_APPOINTMENTS, {
    variables: {
      input: {
        clinicIds: [currentClinic.id],
      },
    },
  });

  const patients = useMemo(() => R.propOr([], 'patients')(patientsData), [
    patientsData,
  ]);
  const appointments = useMemo(
    () => R.propOr([], 'appointments')(appointmentsData),
    [appointmentsData]
  );

  return {
    patients,
    appointments,
  };
}
