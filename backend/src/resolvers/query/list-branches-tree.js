import { prisma } from '@';
import * as R from 'ramda';

import { PERMISSION_LEVEL, POSITION } from '@/utils/constants';
import {
  byUsers,
  bySpecialties,
  byBranches,
} from '@/services/permission.service';
import { permissions } from '../role';

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
  console.log(action,'aaaaaaaaaaaaaaaaaaaaaaaaaa');
  if (user.position === POSITION.Admin  ) {
    return byOrganization(organizationId);
  }
  const role = await prisma.permissionRole
    .findMany({
      where: {
        users: {
          every: {
            id: user.id,
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
