import { prisma } from '@';

const listBranchesTreeByOrganizationId = (_, { organizationId }) => {
  return prisma.branch.findMany({
    where: {
      organizationId: organizationId,
    },
  });
};

export default listBranchesTreeByOrganizationId;
