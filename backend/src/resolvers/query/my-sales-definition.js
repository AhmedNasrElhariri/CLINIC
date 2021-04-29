import { prisma } from '@';

const mySalesesDefinition = (_, __, { userId }) => {
  return prisma.salesDefinition.findMany({
    where: {
      userId,
    },
  });
};

export default mySalesesDefinition;
