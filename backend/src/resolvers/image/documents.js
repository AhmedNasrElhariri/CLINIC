import { prisma } from '@';

const ImageDocuments = ({ id }) => {
  return prisma.image.findUnique({ where: { id } }).documents();
};

export default ImageDocuments;
