import { prisma } from '@';

const bankRevenues = async (_, __, { userId, organizationId }) => {
  return prisma.bankRevenue.findMany({
    where: {
      userId,
    },
    include: {
      bank: true,
      user:true,
      branch:true,
      specialty:true,
    },
  });
};

export default bankRevenues;
