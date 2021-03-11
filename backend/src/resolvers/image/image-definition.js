import { prisma } from '@';

const imageDefinition = ({ id }) => {
  return prisma.image.findOne({ where: { id } }).imageDefinition();
};

export default imageDefinition;
