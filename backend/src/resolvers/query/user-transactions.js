import { prisma } from '@';
import { PAYROLL_STATUS } from '@/utils/constants';

const userTransactions = (_, { userId }) => {
  return prisma.payrollTransaction.findMany({
    where: {
      payrollUserId: userId,
      payroll: {
        status: PAYROLL_STATUS.Open,
      },
      added: false,
      status: 'on',
    },
  });
};

export default userTransactions;
