import { prisma } from '@';

const addImageDefinition = async (_, { imageDefinition }, { userId }) => {
  const { categoryId, ...rest } = imageDefinition;
  return prisma.imageDefinition.create({
    data: {
      ...rest,
      user: {
        connect: {
          id: userId,
        },
      },
      category: {
        connect: {
          id: categoryId
        },
      },
    },
  });
};

export default addImageDefinition;
