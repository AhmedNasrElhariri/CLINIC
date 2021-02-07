import { prisma } from '@';

const addImageDefinition = async (_, { imageDefinition }, { userId }) => {
  return prisma.imageDefinition.create({
    data: {
      ...imageDefinition,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default addImageDefinition;
