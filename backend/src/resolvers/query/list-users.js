import { prisma } from '@';
import listBranchesTree from './list-branches-tree';
import { ACTIONS } from '@/utils/constants';

const listUsers = async (_, { action }, { user, organizationId }) => {
  if (action) {
    return prisma.user.findMany({
      where: {
        organizationId,
        role: {
          permissions: { some: { action: action } },
        },
        id: { not: user.id },
      },
      include: {
        specialties: true,
        role: true,
      },
    });
  }
  return prisma.user.findMany({
    where: {
      organizationId,
    },
    include: {
      specialties: true,
      role: true,
    },
  });
};

export default listUsers;
