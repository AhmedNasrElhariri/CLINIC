import { prisma } from '@';

const listBranches = (_, __, { organizationId }) => {
  return prisma.branch.findMany({
    where: {
      organizationId,
    },
  });
};

export default listBranches;
