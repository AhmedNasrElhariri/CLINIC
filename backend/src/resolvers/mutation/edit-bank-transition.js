import { prisma } from '@';

const editBankTransition = async (_, { bankTransition }) => {
  const { id, amount } = bankTransition;

  return prisma.bankRevenue.update({
    data: {
      amount: amount,
    },
    where: {
      id,
    },
  });
};

export default editBankTransition;
