import { prisma } from '@';

const inventory = (_, { clinicId }) => {
  return prisma.inventoryItem.findMany({
    where: {
      clinicId,
    },
  });
};

export default inventory;
