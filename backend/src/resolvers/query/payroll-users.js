import { prisma } from '@';

const payrollUsers = (_, __, { organizationId }) => {
  return prisma.payrollUser.findMany({
    where: {
      organizationId: organizationId,
    },
  });
};

export default payrollUsers;
