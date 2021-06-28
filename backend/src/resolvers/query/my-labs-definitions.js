import { prisma } from '@';

const myLabsDefinitions = (_, { categoryId }, { userId }) => {
  return prisma.labDefinition.findMany({
    where: {
      userId,
      categoryId,
    },
    include: {
      category: true,
    },
  });
};

export default myLabsDefinitions;
