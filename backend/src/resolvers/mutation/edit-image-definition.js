import { prisma } from '@';

const editImageDefinition = async (_, { imageDefinition }) => {
  const { id, ...rest } = imageDefinition;

  return prisma.imageDefinition.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editImageDefinition;
