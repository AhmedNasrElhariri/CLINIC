import { prisma } from '@';

const getQuantity = ({ id }) => {
  return prisma.inventoryItemConsumption
    .aggregate({
      _sum: { numberOfUnits: true },
      where: { inventoryItemId: id, status: 'Active' },
    })
    .then(sum => {
      return sum._sum.numberOfUnits ? sum._sum.numberOfUnits : 0;
    });
};

export default getQuantity;
