import { prisma } from '@';

const payRollUser = async (_, { payRollUser }, { organizationId }) => {
  const { userId, salary } = payRollUser;
  return prisma.payRollUser.create({
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

export default payRollUser;
