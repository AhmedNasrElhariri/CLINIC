import { prisma } from '@';

const myUserTransactions = (_, { userId }) => {
  console.log("skkkkkkkkkkkkkkkkkkkkkkkkkkkkkkskkkk",userId);
  return prisma.payrollTransaction.findMany({
    where: {
      payrollUserId: userId,
    },
  });
};

export default myUserTransactions;
