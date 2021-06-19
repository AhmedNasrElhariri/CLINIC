import { prisma } from '@';

const myCompanysDefinition = (_, __, { organizationId }) => {
  return prisma.companyDefinition.findMany({
    where: {
        organizationId,
    },
  });
};

export default myCompanysDefinition;
