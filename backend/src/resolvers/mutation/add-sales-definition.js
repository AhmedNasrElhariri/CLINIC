import { prisma } from '@';

const addSalesDefinition = async (_, { salesDefinition }, { organizationId }) => {
  return prisma.salesDefinition.create({
    data: {
      ...salesDefinition,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addSalesDefinition;
