import { prisma } from '@';

const user = ({ id }) => {
  return prisma.appointment.findUnique({ where: { id } }).doctor();
};

export default user;
