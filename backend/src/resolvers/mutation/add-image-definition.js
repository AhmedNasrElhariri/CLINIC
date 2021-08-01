import { prisma } from '@';

const addImageDefinition = async (_, { imageDefinition }, { userId,organizationId }) => {
  const { categoryId, ...rest } = imageDefinition;
  return prisma.imageDefinition.create({
    data: {
      ...rest,
      user: {
        connect: {
          id: userId,
        },
      },
      organization: {
        connect: {
          id: organizationId,
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
