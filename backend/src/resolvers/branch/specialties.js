import { prisma } from '@';

const specialties = ({ id }) => {
  return prisma.branch.findUnique({ where: { id } }).specialties();
};

export default specialties;
