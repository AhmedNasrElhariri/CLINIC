import { prisma } from '@';

const imagesDocuments = ({ id }) => {
  return prisma.lab.findUnique({ where: { id } }).documents();
};

export default imagesDocuments;
