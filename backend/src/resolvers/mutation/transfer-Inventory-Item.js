import {
  reducedInventoryPattern,
  createInventoryItem,
} from '@/services/inventory.service';
import { prisma } from '@';
const transferInventoryItem = async (
  _,
  { input },
  { organizationId, userId }
) => {
  const { id, itemId, quantity, toBranchId, toSpecialtyId, toUserId } = input;
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
    userId: null,
    level: '',
    status: 'Pending',
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
