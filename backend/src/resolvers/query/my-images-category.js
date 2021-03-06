import { prisma } from '@';

const myImagesCategory = (_, __, { userId }) => {
  return prisma.imageCategory.findMany({
    where: {
      userId,
    },
  });
};

export default myImagesCategory;
