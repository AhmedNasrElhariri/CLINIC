import { prisma } from '@';

const TransctionRevenuesTimeFrame = (_, { userId }) => {
  return prisma.transactionRevenuesTimeFrame.findUnique({
    where: {
      payrollUserId: userId,
    },
  });
};

export default TransctionRevenuesTimeFrame;
