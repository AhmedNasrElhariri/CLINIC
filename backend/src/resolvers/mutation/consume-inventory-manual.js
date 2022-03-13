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
  const { items, branchId, specialtyId, userId: doctorId } = data;
  const updatedItems = await updatedUsedMaterials(organizationId, items);
  
  await createSubstractHistoryForMultipleItems({
    data: items,
    userId,
    branchId,
    specialtyId,
    doctorId,
    organizationId: organizationId,
  });
  return updatedItems;
};

export default consumeInventoryManual;
