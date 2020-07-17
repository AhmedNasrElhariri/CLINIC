import { useMemo } from 'react';
import * as R from 'ramda';
import { useQuery } from '@apollo/client';

import { LIST_PATIENTS } from 'apollo-client/queries';
import useFetchAppointments from 'hooks/fetch-appointments';

export default function NewAppointment() {
  const { data: patientsData } = useQuery(LIST_PATIENTS);

  const { appointments, updateCache } = useFetchAppointments();
  const patients = useMemo(() => R.propOr([], 'patients')(patientsData), [
    patientsData,
  ]);

  return {
    patients,
    appointments,
    updateAppointments: updateCache,
  };
}
