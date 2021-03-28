import { prisma } from '@';

const labDocuments = ({ id }) => {
  return prisma.lab.findOne({ where: { id } }).documents();
};

export default labDocuments;
