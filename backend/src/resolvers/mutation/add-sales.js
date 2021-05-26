import { prisma } from '@';

const addSales = async (_, { sales }, { organizationId }) => {
  const { salesDefinitionId, quantity} = sales;
  const salesDefinitionRow = await prisma.salesDefinition.findUnique({
      where:{
          id:salesDefinitionId,
      }
  });
  const totalPrice = salesDefinitionRow.price * quantity;
  const totalCost = salesDefinitionRow.cost * quantity;
  return prisma.sales.create({
    data: {
      quantity:quantity,
      totalPrice:totalPrice,
      totalCost:totalCost,
      date: new Date(),
      organization: {
        connect: {
          id: organizationId,
        },
      },
      salesDefinition:{
          connect:{
              id:salesDefinitionId,
          }
      }
    },
  });
};

export default addSales;
