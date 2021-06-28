import { prisma } from '@';

const addLabDefinition = async (_, { labDefinition }, { userId }) => {
  const { categoryId, ...rest } = labDefinition;
  return prisma.labDefinition.create({
    data: {
      ...rest,
      user: {
        connect: {
          id: userId,
        },
      },
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  });
};

export default addLabDefinition;
