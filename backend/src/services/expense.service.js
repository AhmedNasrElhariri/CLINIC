import { prisma } from '@';

export const createInventoryExpense = async ({ name, price, clinicId }) => {
  return prisma.expense.create({
    data: {
      name,
      amount: price,
      date: new Date(),
      clinic: {
        connect: {
          id: clinicId,
        },
      },
    },
  });
};
