import { prisma } from '@';

const TransctionCoursesTimeFrame = (_, { userId }) => {
  return prisma.transactionCoursesTimeFrame.findUnique({
    where: {
      payrollUserId: userId,
    },
  });
};

export default TransctionCoursesTimeFrame;
