import { prisma } from '@';

const userTransactions = (_, { userId }) => {
  return prisma.payrollTransaction.findMany({
    where: {
      payrollUserId: userId,
      payroll:{
        status:'Open',
      }
    },
  });
};

export default userTransactions;
