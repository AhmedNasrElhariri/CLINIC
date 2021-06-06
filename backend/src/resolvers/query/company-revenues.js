import { prisma } from '@';

const CompanyRevenues = async (_, __, { userId, organizationId }) => {
  return prisma.insuranceRevenue.findMany({
    where: {
      userId,
    },
    include: {
      company: true,
    },
  });
};

export default CompanyRevenues;
