import { prisma } from '@';

const category = ({ id }) => {
  return prisma.labDefinition.findUnique({ where: { id } }).category();
};

export default category;
