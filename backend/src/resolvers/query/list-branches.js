import { prisma } from '@';

const listBranches = (_, { organizationId }) => {
  return prisma.branch.findMany({
    where: {
      organizationId,
    },
  });
};

export default listBranches;
