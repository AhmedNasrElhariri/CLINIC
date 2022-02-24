import { prisma } from '@';

const editBankTransition = async (_, { bankTransition }) => {
  const { id, ...rest } = bankTransition;

  return prisma.bankRevenue.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editBankTransition;
