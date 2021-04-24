import { prisma } from '@';

const appointment = async (_, { id }) => {
  return prisma.appointment.findUnique({ where: { id } });
};

export default appointment;
