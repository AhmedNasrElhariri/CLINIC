import { prisma } from '@';

const adjustAppointment = (_, { id, date }) => {
  return prisma.appointment.update({
    data: { date },
    where: { id },
  });
};

export default adjustAppointment;
