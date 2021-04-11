import { prisma } from '@';

const myUserTransactions = (_, { userId }) => {
  console.log("skkkkkkkkkkkkkkkkkkkkkkkkkkkkkkskkkk",userId);
  return prisma.payRollTransaction.findMany({
    where: {
      payRollUserId: userId,
    },
  });
};

export default myUserTransactions;
