import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';

const removeItem = async (_, { itemId, clinicId }) => {
  const items = await prisma.inventoryItem.findMany({
    where: { itemId, clinicId },
  });

  if (items.length) {
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
