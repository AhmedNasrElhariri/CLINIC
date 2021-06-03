import { prisma } from '@';

const editBankDefinition = async (_, { bankDefinition }) => {
  const { id, ...rest } = bankDefinition;

  return prisma.bankDefinition.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editBankDefinition;
