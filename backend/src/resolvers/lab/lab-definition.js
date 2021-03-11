import { prisma } from '@';

const labDefinition = ({ id }) => {
  return prisma.lab.findOne({ where: { id } }).labDefinition();
};

export default labDefinition;
