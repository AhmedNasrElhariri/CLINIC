import { prisma } from '@';

const imageDefinition = ({ id }) => {
  return prisma.image.findUnique({ where: { id } }).imageDefinition();
};

export default imageDefinition;
