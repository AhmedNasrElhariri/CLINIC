import { prisma } from '@';

const myLabsCategory = (_, __, { userId ,organizationId}) => {
  return prisma.labCategory.findMany({
    where: {
      organizationId,
    },
  });
};

export default myLabsCategory;
