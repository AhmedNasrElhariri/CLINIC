import { prisma } from '@';

export const createInventoryExpense = async ({ name, price, userId }) => {
  return prisma.expense.create({
    data: {
      name,
      amount: price,
      date: new Date(),
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const createAppointmentExpense = async (userId, amount) => {
  return prisma.expense.create({
    data: {
      date: new Date(),
      name: 'Session Discount',
      amount,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};
