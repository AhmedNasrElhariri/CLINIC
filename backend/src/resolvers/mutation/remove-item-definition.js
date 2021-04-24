import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';

const removeItemDefinition = async (_, { id }) => {
  const item = await prisma.item.findUnique({
    where: { id },
    include: { inventoryItems: true, inventoryHistory: true },
  });

  const inventoryItems = item.inventoryItems;

  if (inventoryItems.length) {
    throw new APIExceptcion(`can't remove item definition which already used`);
  }

  const historyIds = item.inventoryHistory.map(({ id }) => id);

  await prisma.inventoryHistory.deleteMany({
    where: {
      id: { in: historyIds },
    },
  });
  return prisma.item.delete({ where: { id } });
};

export default removeItemDefinition;
