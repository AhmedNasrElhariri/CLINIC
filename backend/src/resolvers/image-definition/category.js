import { prisma } from '@';

const category = ({ id }) => {
  return prisma.imageDefinition.findUnique({ where: { id } }).category();
};

export default category;
