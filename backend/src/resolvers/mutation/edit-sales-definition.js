import { prisma } from '@';

const editSalesDefinition = async (_, { salesDefinition }) => {
  const { id, ...rest } = salesDefinition;

  return prisma.salesDefinition.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editSalesDefinition;
