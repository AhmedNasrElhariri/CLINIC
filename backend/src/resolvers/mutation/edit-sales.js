import { prisma } from '@';

const editSales = async (_, { sales }, { userId }) => {
  const { id, ...rest } = sales;
  return prisma.inventoryHistory.update({
    data: rest,
    where: { id },
  });
};

export default editSales;
