import { prisma } from '@';

const myImagesCategory = (_, __, { userId ,organizationId}) => {
  return prisma.imageCategory.findMany({
    where: {
      organizationId,
    },
  });
};

export default myImagesCategory;
