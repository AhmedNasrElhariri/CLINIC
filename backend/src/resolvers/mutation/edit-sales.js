import { prisma } from '@';

const editSales = async (_, { sales }, { userId }) => {
  const { id, salesDefinitionId, quantity } = sales;
  const salesDefinitionRow = await prisma.salesDefinition.findUnique({
    where: {
      id: salesDefinitionId,
    },
  });
  const salesRow = await prisma.sales.findUnique({
    where: {
      id: id,
    },
  });
  const totalPrice = salesDefinitionRow.price * quantity;
  const totalCost = salesDefinitionRow.cost * quantity;
  const totalQaun =
    salesDefinitionRow.totalQuantity + salesRow.quantity - quantity;
  await prisma.salesDefinition.update({
    data: {
      totalQuantity: totalQaun,
    },
    where: {
      id: salesDefinitionId,
    },
  });
  return prisma.sales.update({
    data: {
      quantity: quantity,
      totalPrice: totalPrice,
      totalCost: totalCost,
      date: new Date(),
      user: {
        connect: {
          id: userId,
        },
      },
      salesDefinition: {
        connect: {
          id: salesDefinitionId,
        },
      },
    },
    where: {
      id: id,
    },
  });
};

export default editSales;
