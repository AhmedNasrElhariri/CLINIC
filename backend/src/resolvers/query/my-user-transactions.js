import { prisma } from '@';

const myUserTransactions = (_, { userId }) => {
  return prisma.payrollTransaction.findMany({
    where: {
      payrollUserId: userId,
    },
  });
};

export default myUserTransactions;
