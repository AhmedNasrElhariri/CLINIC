import { prisma } from '@';

const mySessionsDefinition = (_, __, { userId }) => {
  return prisma.sessionDefinition.findMany({
    where: {
      userId,
    },
  });
};

export default mySessionsDefinition;
