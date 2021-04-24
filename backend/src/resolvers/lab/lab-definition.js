import { prisma } from '@';

const labDefinition = ({ id }) => {
  return prisma.lab.findUnique({ where: { id } }).labDefinition();
};

export default labDefinition;
