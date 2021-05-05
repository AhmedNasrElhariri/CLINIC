import { prisma } from '@';

const imagesDocuments = ({ id }) => {
  return prisma.image.findUnique({ where: { id } }).documents();
};

export default imagesDocuments;
