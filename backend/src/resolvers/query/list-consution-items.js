import { prisma } from '@';

const listConsutionItems = (_, __, { userId }) => {
  return prisma.inventoryItemConsumption.findMany({
    where: {
      userId: userId,
      status: 'Pending',
    },
    include: {
      inventoryItem: { include: { item: true, branch: true } },
    },
  });
};

export default listConsutionItems;
