import { prisma } from '@';
import * as R from 'ramda';

import { PERMISSION_LEVEL, POSITION } from '@/utils/constants';

const byOrganization = async (organizationId, allUsers = false) => {
  if (allUsers) {
    return prisma.user.findMany({
      where: {
        organizationId,
      },
    });
  }

  const branches = await prisma.branch.findMany({
    where: { organizationId },
    include: {
      specialties: {
        include: { userSpecialties: { include: { user: true } } },
      },
    },
  });

  return R.pipe(
    R.map(R.prop('specialties')),
    R.flatten,
    R.map(R.path(['userSpecialties'])),
    R.flatten,
    R.map(R.path(['user'])),
    R.flatten,
    R.uniqBy(R.prop('id'))
  )(branches);
};

export const byBranches = (organizationId, rules) =>
  prisma.branch.findMany({
    where: { organizationId, id: { in: rules.map(r => r.branchId) } },
    include: {
      specialties: {
        include: { userSpecialties: { include: { user: true } } },
      },
    },
  });

export const bySpecialties = rules => {
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

export const byUsers = rules => {
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

export const listFlattenUsersTree = async (
  { action, user, organizationId },
  allUsers
) => {
  if (user.position === POSITION.Admin) {
    return byOrganization(organizationId, allUsers);
  }
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
      return byOrganization(organizationId, allUsers);
    case PERMISSION_LEVEL.BRANCH:
      return all
        ? byOrganization(organizationId)
        : byBranches(organizationId, rules);
    case PERMISSION_LEVEL.SPECIALTY:
      return bySpecialties(rules);
    case PERMISSION_LEVEL.USER:
      return byUsers(rules);
  }
};

export const listFlattenUsersTreeIds = async (
  { action, user, organizationId },
  allUsers
) => {
  const users = await listFlattenUsersTree(
    {
      action,
      user,
      organizationId,
    },
    allUsers
  );

  return R.map(R.prop('id'))(users);
};
