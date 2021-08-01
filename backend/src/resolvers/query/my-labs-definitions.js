import { prisma } from '@';

const myLabsDefinitions = (_, { categoryId }, { userId ,organizationId}) => {
  return prisma.labDefinition.findMany({
    where: {
      organizationId,
      categoryId,
    },
    include: {
      category: true,
    },
  });
};

export default myLabsDefinitions;
