import { prisma } from '@';
import { createAppointmentRevenue } from '@/services/revenue.service';

const setAppointmentDone = async (_, { id }) => {
  const appointment = await prisma.appointment.update({
    data: { status: 'Done' },
    where: { id },
  });

  await createAppointmentRevenue(appointment);

  return appointment;
};

export default setAppointmentDone;
