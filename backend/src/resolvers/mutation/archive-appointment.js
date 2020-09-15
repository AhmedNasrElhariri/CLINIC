import { prisma } from '@';
import { createAppointmentRevenue } from '@/services/revenue.service';

const archiveAppointment = async (_, { id }) => {
  const persistedAppointment = await prisma.appointment.findOne({
    where: {
      id,
    },
  });

  const appointment = await prisma.appointment.update({
    data: { status: 'Archived' },
    where: { id },
  });

  if (persistedAppointment.status != 'Done') {
    await createAppointmentRevenue(appointment);
  }

  return appointment;
};

export default archiveAppointment;
