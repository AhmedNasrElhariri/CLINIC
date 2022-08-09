import { prisma } from '@';

const listBranchesTreeByOrganizationId = (_, { organizationId }) => {
  return prisma.branch.findMany({
    where: {
      organizationId: organizationId,
    },
    include: {
      specialties: true,
      userSpecialties: true,
    },
  });
};

export default listBranchesTreeByOrganizationId;
