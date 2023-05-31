import { prisma } from '@';

const getAllBranchesIds = async (ids, organizationId) => {
  const branches = await prisma.branch.findMany({ where: { organizationId } });

  const branchesIds = branches
    .filter(b => ids.includes(b.id))
    .reduce((acc, b) => [...acc, b.id], []);

  return { branchesIds };
};
export default getAllBranchesIds;
