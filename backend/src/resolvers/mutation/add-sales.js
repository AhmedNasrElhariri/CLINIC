import { prisma } from '@';

const addSales = async (_, { sales }, { userId }) => {
  const { salesDefinitionId, quantity} = sales;
  const salesDefinitionRow = await prisma.salesDefinition.findUnique({
      where:{
          id:salesDefinitionId,
      }
  });
  const totalPrice = salesDefinitionRow.price * quantity;
  return prisma.sales.create({
    data: {
      quantity:quantity,
      totalPrice:totalPrice,
      date: new Date(),
      user: {
        connect: {
          id: userId,
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
