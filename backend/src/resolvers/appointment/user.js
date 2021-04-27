import { prisma } from '@';

const user = ({ id }) => {
  return prisma.appointment.findUnique({ where: { id } }).user();
};

export default user;
