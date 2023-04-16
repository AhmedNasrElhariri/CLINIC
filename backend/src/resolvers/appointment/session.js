import { prisma } from '@';

const session = ({ id, session }) => {
  if (session) {
    return session;
  }
  return prisma.appointment.findUnique({ where: { id } }).session();
};

export default session;
