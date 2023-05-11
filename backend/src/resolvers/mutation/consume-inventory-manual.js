import { prisma } from '@';
import {
  createSubstractHistoryForMultipleItems,
  updatedUsedMaterials,
} from '@/services/inventory.service';

const consumeInventoryManual = async (
  _,
  { data },
  { userId, organizationId }
) => {
  const { items, branchId, specialtyId, userId: doctorId, isSelling } = data;
  await updatedUsedMaterials(organizationId, items, isSelling);

  await createSubstractHistoryForMultipleItems({
    data: items,
    userId,
    branchId,
    specialtyId,
    doctorId,
    organizationId: organizationId,
    isSelling,
  });
  const updatedItems = await prisma.inventoryItem.findMany({
    where: {
      organizationId,
    },
  });

  ///

  return updatedItems;
};

export default consumeInventoryManual;
