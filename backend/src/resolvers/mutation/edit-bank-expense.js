import { prisma } from '@';

const editBankExpense = async (_, { bankTransition }) => {
  const { id, ...rest } = bankTransition;

  return prisma.bankExpense.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editBankExpense;
