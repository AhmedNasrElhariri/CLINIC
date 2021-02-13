import { prisma } from '@';
import * as R from 'ramda';

import { PERMISSION_LEVEL } from '@/utils/constants';

const byOrganization = organizationId =>
  prisma.branch.findMany({
    where: { organizationId },
    include: {
      specialties: {
        include: { userSpecialties: { include: { user: true } } },
      },
    },
  });

const byBranches = (organizationId, rules) =>
  prisma.branch.findMany({
    where: { organizationId, id: { in: rules.map(r => r.branchId) } },
    include: {
      specialties: {
        include: { userSpecialties: { include: { user: true } } },
      },
    },
  });

const bySpecialties = rules => {
  const orArg = rules.map(({ branchId, specialtyId }) => ({
    id: branchId,
    specialties: {
      every: {
        id: specialtyId,
      },
    },
  }));

  return prisma.branch.findMany({
    where: {
      OR: orArg,
    },
  });
};

const byUser = rules => {
  const orArg = rules.map(({ userId, branchId, specialtyId }) => ({
    id: branchId,
    specialties: {
      every: {
        id: specialtyId,
        userSpecialties: {
          every: {
            userId,
          },
        },
      },
    },
  }));

  return prisma.branch.findMany({
    where: {
      OR: orArg,
    },
  });
};

const listBranchesTree = async (_, { action }, { userId, organizationId }) => {
  const role = await prisma.permissionRole
    .findMany({
      where: {
        users: {
          every: {
            id: userId,
          },
        },
      },
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
    })
    .then(res => (res.length ? res[0] : null));

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
      return bySpecialties(rules);
    case PERMISSION_LEVEL.USER:
      return byUser(rules);
  }
};

export default listBranchesTree;
