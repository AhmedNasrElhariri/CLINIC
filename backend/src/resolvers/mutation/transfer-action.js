import { prisma } from '@';
import { InventoryConsumedStatus } from '@/utils/constants';
const transferAction = async (_, { id, fromInventoryItemId, type }) => {
  if (type === 'accept') {
    const inventoryItemConsumption = await prisma.inventoryItemConsumption.update(
      {
        data: {
          status: InventoryConsumedStatus.ACTIVE,
          insertionDate: new Date(),
        },
        where: { id },
      }
    );
    return { inventoryItemConsumption, accept: true };
  } else {
    const inventoryItemConsumption = await prisma.inventoryItemConsumption.update(
      {
        data: {
          status: InventoryConsumedStatus.ACTIVE,
          inventoryItemId: fromInventoryItemId,
          insertionDate: new Date(),
        },
        where: { id },
      }
    );
    return { inventoryItemConsumption, accept: false };
  }
};

export default transferAction;
