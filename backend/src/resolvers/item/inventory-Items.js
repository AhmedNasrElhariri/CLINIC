import { prisma } from '@';

const inventoryItems = ({ id }) => {
  return prisma.item.findOne({ where: { id } }).inventoryItems();
};

export default inventoryItems;
