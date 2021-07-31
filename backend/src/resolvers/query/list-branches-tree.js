import { prisma } from '@';
import * as R from 'ramda';

import { PERMISSION_LEVEL, POSITION } from '@/utils/constants';

export const byBranches = async (organizationId, rules) => {
  const branches = await prisma.branch.findMany({
    where: { organizationId, id: { in: rules.map(r => r.branchId) } },
    include: {
      specialties: {
        include: { userSpecialties: { include: { user: true } } },
      },
    },
  });
  return branches;
};

export const bySpecialties = async (organizationId, rules) => {
  const branches = await prisma.branch.findMany({
    where: { organizationId, id: { in: rules.map(r => r.branchId) } },
    include: {
      specialties: {
        include: { userSpecialties: { include: { user: true } } },
      },
    },
  });
  return branches;
};

export const byUsers = async rules => {
  const orArg = rules.map(({ userId, branchId, specialtyId }) => ({
    id: branchId,
  }));
  const branches = await prisma.branch.findMany({
    where: {
      OR: orArg,
    },
    include: {
      specialties: {
        include: { userSpecialties: { include: { user: true } } },
      },
    },
  });
  return branches;
};

const byOrganization = organizationId =>
  prisma.branch.findMany({
    where: { organizationId },
    include: {
      specialties: {
        include: { userSpecialties: { include: { user: true } } },
      },
    },
  });

const listBranchesTree = async (_, { action }, { user, organizationId }) => {
  if (user.position === POSITION.Admin) {
    return byOrganization(organizationId);
  }
  // const role = await prisma.permissionRole
  //   .findMany({
  //     where: {
  //       users: {
  //         every: {
  //           id: user.id,
  //         },
  //       },
  //     },
  //     include: {
  //       permissions: {
  //         where: {
  //           action,
  //         },
  //         include: {
  //           rules: true,
  //         },
  //       },
  //     },
  //   });
    const role = await prisma.user.findUnique({ where: { id: user.id } }).role({
      include: {
        permissions: {
          where: {
            action,
          },
          include: {
            rules: true,
          },
        },
      },
    });
    
  const permission = R.pathOr(null, ['permissions', '0'])(role);
  if (!permission) {
    return [];
  }

  const { level, all, rules } = permission;
  switch (level) {
    case PERMISSION_LEVEL.ORGANIZATION:
      return byOrganization(organizationId);
    case PERMISSION_LEVEL.BRANCH:
      return all
        ? byOrganization(organizationId)
        : byBranches(organizationId, rules);
    case PERMISSION_LEVEL.SPECIALTY:
      return bySpecialties(organizationId, rules);
    case PERMISSION_LEVEL.USER:
      return byUsers(rules);
  }
};

export default listBranchesTree;
