import { prisma } from '@';

const inventory = (_, __, { userId }) => {
  return prisma.inventoryItem.findMany({
    where: {
      userId,
    },
  });
};

export default inventory;
