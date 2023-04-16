import { prisma } from '@';

const user = ({ id, user }) => {
  if (user) {
    return user;
  }
  return prisma.appointment.findUnique({ where: { id } }).user();
};

export default user;
