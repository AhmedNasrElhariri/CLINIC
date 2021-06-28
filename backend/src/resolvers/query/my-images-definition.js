import { prisma } from '@';

const myImagesDefinition = (_, { categoryId }, { userId }) => {
  return prisma.imageDefinition.findMany({
    where: {
      userId,
      categoryId,
    },
    include: {
      category: true,
    },
  });
};

export default myImagesDefinition;
