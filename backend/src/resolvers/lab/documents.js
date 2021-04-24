import { prisma } from '@';

const labDocuments = ({ id }) => {
  return prisma.lab.findUnique({ where: { id } }).documents();
};

export default labDocuments;
