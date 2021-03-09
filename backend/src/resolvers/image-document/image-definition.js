import { prisma } from '@';

const ImageDocument = ({ id }) => {
  return prisma.imageDocument.findOne({ where: { id } }).imageDefinition();
};

export default ImageDocument;
