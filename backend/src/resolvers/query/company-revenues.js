import { prisma } from '@';

const CompanyRevenues = async (_, __, { userId, organizationId }) => {
  return prisma.insuranceRevenue.findMany({
    where: {
      userId,
    },
    include: {
      company: true,
      user: true,
      branch: true,
      specialty: true,
    },
  });
};

export default CompanyRevenues;
