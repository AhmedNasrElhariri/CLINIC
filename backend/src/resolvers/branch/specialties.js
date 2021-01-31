import { prisma } from '@';

const specialties = ({ id }) => {
  return prisma.branch.findOne({ where: { id } }).specialties();
};

export default specialties;
