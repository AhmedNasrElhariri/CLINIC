import { prisma } from '@';

const appointment = (_, { id }) => {
  return prisma.appointment.findOne({ where: { id } });
};

export default appointment;
