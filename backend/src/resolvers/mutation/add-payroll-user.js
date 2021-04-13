import { prisma } from '@';

const payrollUser = async (_, { payrollUser }, { organizationId }) => {
  const { userId, salary } = payrollUser;
  return prisma.payrollUser.create({
    data: {
      id: userId,
      salary: salary,
      netSalary: salary,
      organizationId: organizationId,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default payrollUser;
