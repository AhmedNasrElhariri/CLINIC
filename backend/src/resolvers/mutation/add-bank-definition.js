import { prisma } from '@';

const addBankDefinition = async (_, { bankDefinition }, { organizationId }) => {
  return prisma.bankDefinition.create({
    data: {
      ...bankDefinition,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addBankDefinition;
