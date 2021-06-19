import { prisma } from '@';

const myCompanysSessionDefinition = (_, __, { organizationId }) => {
  return prisma.companySessionDefinition.findMany({
    where: {
      organizationId,
    },
    include: {
      company: true,
    },
  });
};

export default myCompanysSessionDefinition;
