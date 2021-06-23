import { prisma } from '@';

const role = ({ id }) => {
  return prisma.user.findUnique({ where: { id } }).role();
};

export default role;
