import { prisma } from '@';

const branches = ({ id }) => {
  return prisma.specialty.findOne({ where: { id } }).branches();
};

export default branches;
