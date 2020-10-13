import { prisma } from '@';
import { getAppointmentNextStatus } from '@/services/appointment.service';
import { createAppointmentRevenue } from '@/services/revenue.service';
import { APPOINTMENTS_STATUS } from '@/utils/constants';

const setAppointmentDone = async (_, { id, sessions }) => {
  const persistedAppointment = await prisma.appointment.findOne({
    where: { id },
  });

  const status = getAppointmentNextStatus(
    persistedAppointment.status,
    APPOINTMENTS_STATUS.DONE
  );

  const appointment = await prisma.appointment.update({
    data: { status },
    where: { id },
  });

  await createAppointmentRevenue(id, sessions);
  return appointment;
};

export default setAppointmentDone;
