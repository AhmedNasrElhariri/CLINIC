import { LIST_PATIENTS } from 'apollo-client/queries';
import useFetchAppointments from 'hooks/use-appointments';
import useFetchPatients from 'hooks/use-patients';

export default function NewAppointment() {
  const {
    appointments,
    updateCache,
    branches,
    specialties,
    doctors,
  } = useFetchAppointments();
  const { patients } = useFetchPatients(LIST_PATIENTS);

  return {
    patients,
    appointments,
    updateAppointments: updateCache,
    branches,
    specialties,
    doctors,
  };
}
