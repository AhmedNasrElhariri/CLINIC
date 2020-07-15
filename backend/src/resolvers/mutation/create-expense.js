import { prisma } from '@';

const createExpense = async (_, { expense: { clinicId, ...expense } }) => {
  return prisma.expense.create({
    data: {
      clinic: {
        connect: {
          id: clinicId,
        },
      },
      ...expense,
    },
  });
};

export default createExpense;
