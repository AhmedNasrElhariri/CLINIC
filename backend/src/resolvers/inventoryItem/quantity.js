import { prisma } from '@';

const quantity = async ({ id }) => {
  const sum = await prisma.inventoryItemConsumption.aggregate({
    _sum: { numberOfUnits: true },
    where: { inventoryItemId: id, status: 'Active' },
  });
  return sum._sum.numberOfUnits ? sum._sum.numberOfUnits : 0;
};

export default quantity;
