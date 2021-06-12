import { prisma } from '@';

const payrollUser = async (_, { payrollUser }, { organizationId }) => {
  const { salary, userId } = payrollUser;
  return prisma.payrollUser.create({
    data: {
      salary: salary,
      user: {
        connect: {
          id: userId,
        },
      },
      organizationId,
    },
  });
};

export default payrollUser;
