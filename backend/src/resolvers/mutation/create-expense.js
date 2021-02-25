import { prisma } from '@';

const createExpense = async (_, { expense }, { userId }) => {
  return prisma.expense.create({
    data: {
      ...expense,
      user: {
        connect: {
          id: userId,
        },
      },
      ...expense,
    },
  });
};

export default createExpense;
