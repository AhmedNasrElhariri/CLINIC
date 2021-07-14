import { prisma } from '@';

const bankRevenues = async (_, __, { userId, organizationId }) => {
  return prisma.bankRevenue.findMany({
    where: {
      organizationId,
    },
    include: {
      bank: true,
      user:true,
      branch:true,
      specialty:true,
      doctor:true,
    },
  });
};

export default bankRevenues;
