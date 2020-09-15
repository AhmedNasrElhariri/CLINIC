import { prisma } from '@';

const cancelAppointment = (_, { id }) => {
  return prisma.appointment.update({
    data: { status: 'Cancelled' },
    where: { id },
  });
};

export default cancelAppointment;
