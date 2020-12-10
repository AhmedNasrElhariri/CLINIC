import { LIST_PATIENTS } from 'apollo-client/queries';
import useFetchAppointments from 'hooks/fetch-appointments';
import useFetchPatients from 'hooks/fetch-patients';

export default function NewAppointment() {
  const {
    appointments,
    updateCache,
    branches,
    specializations,
    doctors,
  } = useFetchAppointments();
  const { patients } = useFetchPatients(LIST_PATIENTS);

  return {
    patients,
    appointments,
    updateAppointments: updateCache,
    branches,
    specializations,
    doctors,
  };
}
