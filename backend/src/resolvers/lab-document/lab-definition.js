import { prisma } from '@';

const labDefinition = ({ id }) => {
  return prisma.labDocument.findOne({ where: { id } }).labDefinition();
};

export default labDefinition;
