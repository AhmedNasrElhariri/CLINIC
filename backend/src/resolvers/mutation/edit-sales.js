import { prisma } from '@';

const addSales = async (_, { sales }, { userId }) => {
  const { id, salesDefinitionId, quantity } = sales;
  const salesDefinitionRow = await prisma.salesDefinition.findUnique({
    where: {
      id: salesDefinitionId,
    },
  });
  const totalPrice = salesDefinitionRow.price * quantity;
  const totalCost = salesDefinitionRow.cost * quantity;
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

export default addSales;
