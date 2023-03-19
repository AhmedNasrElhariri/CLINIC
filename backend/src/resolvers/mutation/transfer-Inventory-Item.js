import {
  reducedInventoryPattern,
  createInventoryItem,
} from '@/services/inventory.service';
import { InventoryConsumedStatus } from '@/utils/constants';
import { prisma } from '@';
const transferInventoryItem = async (
  _,
  { input },
  { organizationId, userId }
) => {
  const { id, itemId, quantity, toBranchId, toUserId } = input;
  const inventoryItem = await prisma.inventoryItem.findUnique({
    where: { id },
  });
  const item = await prisma.item.findUnique({ where: { id: itemId } });
  const inputTwo = {
    itemId: itemId,
    amount: quantity,
    price: inventoryItem.price,
    branchId: toBranchId,
    specialtyId: null,
    userId: toUserId,
    level: '',
    status: InventoryConsumedStatus.PENDING,
    fromItemId: id,
  };
  const items = [{ itemId: id, quantity: quantity * item.quantity }];
  await reducedInventoryPattern(organizationId, items);
  return createInventoryItem(inputTwo, {
    userId: userId,
    organizationId: organizationId,
  });
};

export default transferInventoryItem;
