import { createInventoryItem } from '@/services/inventory.service';

const addItem = async (_, { item: input }, { userId, organizationId }) => {
  return createInventoryItem(input, {
    userId: userId,
    organizationId: organizationId,
  });
};

export default addItem;
