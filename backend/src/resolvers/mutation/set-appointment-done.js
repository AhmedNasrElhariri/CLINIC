import { prisma } from '@';
import { createAppointmentRevenue } from '@/services/revenue.service';

const setAppointmentDone = async (_, { id, sessions }) => {
  const appointment = await prisma.appointment.update({
    data: { status: 'Done' },
    where: { id },
  });

  await createAppointmentRevenue(id, sessions);
  return appointment;
};

export default setAppointmentDone;
