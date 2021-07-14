import { prisma } from '@';

const CompanyRevenues = async (_, __, { userId, organizationId }) => {
  return prisma.insuranceRevenue.findMany({
    where: {
      organizationId,
    },
    include: {
      company: true,
      user: true,
      branch: true,
      specialty: true,
      doctor: true,
    },
  });
};

export default CompanyRevenues;
