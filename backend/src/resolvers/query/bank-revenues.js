import { prisma } from '@';

const bankRevenues = async (_, __, { user, organizationId }) => {
  return prisma.bankRevenue.findMany({
    where: {
      organizationId,
    },
    include: {
      bank: true,
      user: true,
      branch: true,
      specialty: true,
      doctor: true,
      patient: true,
    },
  });
};

export default bankRevenues;
