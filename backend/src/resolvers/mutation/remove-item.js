import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';

import { INVENTORY_OPERATION } from '@/utils/constants';

const removeItem = async (_, { itemId, clinicId }) => {
  const history = await prisma.inventoryHistory.findMany({
    where: {
      itemId,
      clinicId,
      operation: INVENTORY_OPERATION.SUBSTRACT,
    },
  });

  const removable =
    history.reduce((acc, { quantity }) => acc + quantity, 0) === 0;

  if (!removable) {
    throw new APIExceptcion(`can't remove item which already used`);
  }

  return prisma.inventoryItem.delete({
    where: {
      itemId_clinicId: {
        itemId,
        clinicId,
      },
    },
  });
};

export default removeItem;
