import { prisma } from '@';

const addSessionDefinition = async (_, { sessionDefinition }, { userId }) => {
  return prisma.sessionDefinition.create({
    data: {
      ...sessionDefinition,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default addSessionDefinition;
