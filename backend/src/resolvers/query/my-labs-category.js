import { prisma } from '@';

const myLabsCategory = (_, __, { userId }) => {
  return prisma.labCategory.findMany({
    where: {
      userId,
    },
  });
};

export default myLabsCategory;
