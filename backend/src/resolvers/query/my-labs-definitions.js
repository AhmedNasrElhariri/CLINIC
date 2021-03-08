import { prisma } from '@';

const myLabsDefinitions = (_, __, { userId }) => {
  return prisma.labDefinition.findMany({
    where: {
      userId,
    },
  });
};

export default myLabsDefinitions;
