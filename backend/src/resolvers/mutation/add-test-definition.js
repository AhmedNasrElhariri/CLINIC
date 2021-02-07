import { prisma } from '@';

const addTestDefinition = async (_, { testDefinition }, { userId }) => {
  return prisma.testDefinition.create({
    data: {
      ...testDefinition,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default addTestDefinition;
