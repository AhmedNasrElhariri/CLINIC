import { prisma } from '@';

const inventory = (_, __, { organizationId }) => {
  return prisma.inventoryItem.findMany({
    where: {
      organizationId,
    },
  });
};

export default inventory;
