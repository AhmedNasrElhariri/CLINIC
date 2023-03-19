import { prisma } from '@';
import { InventoryConsumedStatus } from '@/utils/constants';
const transferAction = async (_, { id, fromInventoryItemId, type }) => {
  if (type === 'accept') {
    return prisma.inventoryItemConsumption.update({
      data: {
        status: InventoryConsumedStatus.ACTIVE,
        insertionDate: new Date(),
      },
      where: { id },
    });
  } else {
    return prisma.inventoryItemConsumption.update({
      data: {
        status: InventoryConsumedStatus.ACTIVE,
        inventoryItemId: fromInventoryItemId,
        insertionDate: new Date(),
      },
      where: { id },
    });
  }
};

export default transferAction;
