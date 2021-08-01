import { prisma } from '@';

const myImagesDefinition = (_, { categoryId }, { userId ,organizationId}) => {
  return prisma.imageDefinition.findMany({
    where: {
      organizationId,
      categoryId,
    },
    include: {
      category: true,
    },
  });
};

export default myImagesDefinition;
