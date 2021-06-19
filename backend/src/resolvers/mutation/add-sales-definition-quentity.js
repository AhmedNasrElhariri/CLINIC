import { prisma } from '@';

const addSalesDefinitionQuantity = async (_, { salesDefinition }) => {
  const { salesId, quantity } = salesDefinition;
  const salesDefinitionRow = await prisma.salesDefinition.findUnique({
    where: {
      id: salesId,
    },
  });
  const { id, totalQuantity, ...rest } = salesDefinitionRow;
  return prisma.salesDefinition.update({
    data: {
      ...rest,
      totalQuantity: totalQuantity + quantity,
    },
    where: {
      id,
    },
  });
};

export default addSalesDefinitionQuantity;
