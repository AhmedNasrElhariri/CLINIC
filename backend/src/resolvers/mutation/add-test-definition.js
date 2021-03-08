import { prisma } from '@';

const addLabDefinition = async (_, { labDefinition }, { userId }) => {
  return prisma.labDefinition.create({
    data: {
      ...labDefinition,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default addLabDefinition;
