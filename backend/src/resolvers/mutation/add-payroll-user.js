import { prisma } from '@';

const payrollUser = async (_, { payrollUser }, { organizationId }) => {
  const { salary, name } = payrollUser;
  return prisma.payrollUser.create({
    data: {
      salary: salary,
      name: name,
      organizationId,
    },
  });
};

export default payrollUser;
