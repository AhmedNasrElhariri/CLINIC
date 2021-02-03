import { prisma } from '@';

const appointment = async (_, { id }) => {
  return prisma.appointment.findOne({ where: { id } });
};

export default appointment;
