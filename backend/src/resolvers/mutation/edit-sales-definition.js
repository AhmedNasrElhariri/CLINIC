import { prisma } from '@';

const editSalesDefinition = async (_, { salesDefinition, type }) => {
  const { id, ...rest } = salesDefinition;
  if (type === 'edit') {
    return prisma.salesDefinition.update({
      data: rest,
      where: {
        id,
      },
    });
  } else {
    await prisma.sales.deleteMany({ where: { salesDefinitionId: id } });
    return prisma.salesDefinition.delete({ where: { id } });
  }
};

export default editSalesDefinition;
