import { prisma } from '@';

const session = ({ id }) => {
  return prisma.appointment.findUnique({ where: { id } }).session();
};

export default session;
