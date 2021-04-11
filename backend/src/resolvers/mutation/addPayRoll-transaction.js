import { prisma } from '@';

const addTransaction = async (_, { payRollTransaction }) => {
  let { userId, amount, type } = payRollTransaction;
  if (type === 'Advance' || type === 'Deduction') {
    amount = amount * -1;
  }
  return prisma.payRollTransaction.create({
    data: {
      amount: amount,
      type: type,
      date: new Date(),
      payRollUser: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default addTransaction;
