import { prisma } from '@';
import { storeHistoryOfTransfer } from '@/services/inventory.service';
import { InventoryConsumedStatus } from '@/utils/constants';
const transferAction = async (_, { id, fromInventoryItemId, type }) => {
  const inventoryItem = await prisma.inventoryItemConsumption.findUnique({
    where: { id: id },
    include: {
      inventoryItem: {
        include: {
          item: true,
        },
      },
    },
  });

  const {
    inventoryItem: {
      item: { id: ITEMID },
      price: purshasingPricePerUnit,
      branchId,
      specialtyId,
      organizationId,
    },
    userId: USERID,
    numberOfUnits,
  } = inventoryItem;

  await storeHistoryOfTransfer({
    itemId: ITEMID,
    userId: USERID,
    organizationId,
    quantity: numberOfUnits,
    price: purshasingPricePerUnit,
    branchId,
    specialtyId,
    subOperation: type,
  });

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
