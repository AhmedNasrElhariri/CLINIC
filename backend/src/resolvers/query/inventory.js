import { prisma } from '@';

const inventory = (_, __, { organizationId }) => {
  return prisma.inventoryItem.findMany({
    where: {
      organizationId,
    },
    include:{
      user:true,
      branch:true,
      specialty:true,
    }
  });
};

export default inventory;
