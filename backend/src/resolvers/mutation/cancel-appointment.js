import { prisma } from '@';

const cancelAppointment = (_, { id }) => {
  return prisma.appointment.delete({
    where: { id },
  });
};

export default cancelAppointment;
