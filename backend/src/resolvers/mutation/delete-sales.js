import { prisma } from '@';

const deleteSales = async (_, { id }) => {
  const salesRow = await prisma.sales.findUnique({
    where: {
      id,
    },
  });
  const salesDefinationRow = await prisma.salesDefinition.findUnique({
    where: {
      id: salesRow.salesDefinitionId,
    },
  });
  await prisma.salesDefinition.update({
    data: {
      totalQuantity: salesDefinationRow.totalQuantity + salesRow.quantity,
    },
    where: {
      id: salesDefinationRow.id,
    },
  });
  return await prisma.sales.delete({
    where: {
      id: id,
    },
  });
};

export default deleteSales;
