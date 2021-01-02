import { prisma } from '@';
import { APIExceptcion } from '@/services/erros.service';

const removeItemDefinition = async (_, { id }) => {
  const item = await prisma.item.findOne({
    where: { id },
    include: { inventoryItems: true },
  });

  const inventoryItems = item.inventoryItems;

  if (inventoryItems.length) {
    throw new APIExceptcion(`can't remove item definition which already used`);
  }

  return prisma.item.delete({ where: { id } });
};

export default removeItemDefinition;
