import { prisma } from '@';

const updateExpense = async (_, { expense: { id, ...expense } }) => {
  return prisma.expense.update({
    data: {
      ...expense,
    },
    where: {
      id,
    },
  });
};

export default updateExpense;
