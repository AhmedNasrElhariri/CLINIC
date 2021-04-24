import { prisma } from '@';

const branches = ({ id }) => {
  return prisma.specialty.findUnique({ where: { id } }).branches();
};

export default branches;
