import { prisma } from '@';

const addSalesDefinition = async (_, { salesDefinition }, { userId }) => {
  return prisma.salesDefinition.create({
    data: {
      ...salesDefinition,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default addSalesDefinition;
