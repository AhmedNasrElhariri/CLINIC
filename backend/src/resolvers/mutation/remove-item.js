import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';

import { INVENTORY_OPERATION } from '@/utils/constants';

const removeItem = async (_, { itemId }, { userId }) => {
  const inventoryItem = await prisma.inventoryItem.findUnique({
    where: { id: itemId },
    include: { item: true },
  });
  const history = await prisma.inventoryHistory.findMany({
    where: {
      itemId: inventoryItem.item.id,
      userId,
      operation: {
        notIn: [INVENTORY_OPERATION.ADD],
      },
    },
  });
  const removable =
    history.reduce((acc, { quantity }) => acc + quantity, 0) === 0;

  if (!removable) {
    throw new APIExceptcion(`can't remove item which already used`);
  }
  await prisma.inventoryItemConsumption.deleteMany({
    where: { inventoryItemId: itemId },
  });
  return prisma.inventoryItem.delete({
    where: {
      id: itemId,
    },
  });
};

export default removeItem;
