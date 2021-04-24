import { prisma } from '@';

const inventoryItems = ({ id }) => {
  return prisma.item.findUnique({ where: { id } }).inventoryItems();
};

export default inventoryItems;
