import { prisma } from '@';

const editImageDefinition = async (_, { imageDefinition, type }) => {
  const { id, ...rest } = imageDefinition;
  if (type === 'edit') {
    return prisma.imageDefinition.update({
      data: rest,
      where: {
        id,
      },
    });
  } else {
    return prisma.imageDefinition.delete({ where: { id } });
  }
};

export default editImageDefinition;
