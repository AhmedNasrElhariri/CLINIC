import { prisma } from '@';
import * as R from 'ramda';

import { PERMISSION_LEVEL, POSITION } from '@/utils/constants';

export const specialtyExisted = (id, specialtiesId) => {
  let exist = false;
  specialtiesId.forEach(s => {
    if (s === id) {
      exist = true;
    }
  });
  return exist;
};

export const byBranches = async (organizationId, rules) => {
  const branches = await prisma.branch.findMany({
    where: { organizationId, id: { in: rules.map(r => r.branchId) } },
    include: {
      specialties: {
        include: { userSpecialties: { include: { user: true } } },
      },
    },
  });
  const updatedBranches = branches.map(b => {
    const { specialties } = b;
    const returnedSpecialties = specialties.map(s => {
      const { userSpecialties } = s;
      const doctors = userSpecialties.map(({ user }) =>
        R.pick(['id', 'name'])(user)
      );
      return { ...s, doctors: doctors };
    });
    return { ...b, specialties: returnedSpecialties };
  });
  return updatedBranches;
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
  const updatedBranches = branches.map(b => {
    const { specialties } = b;
    const rulesSpecialtiesId = rules.map(r => r.specialtyId);
    const returnedSpecialties = specialties.filter(s => {
      const returned = specialtyExisted(s.id, rulesSpecialtiesId);
      if (returned) {
        return s;
      }
    });
    const returnedSpecialties2 = returnedSpecialties.map(s => {
      const { userSpecialties } = s;
      const doctors = userSpecialties.map(({ user }) =>
        R.pick(['id', 'name'])(user)
      );
      return { ...s, doctors: doctors };
    });
    return { ...b, specialties: returnedSpecialties2 };
  });
  return updatedBranches;
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
  const updatedBranches = branches.map(b => {
    const { specialties } = b;
    const rulesUsersId = rules.map(r => r.userId);
    const returnedSpecialties = specialties.map(s => {
      const { userSpecialties } = s;
      const updatedUserSpecialties = userSpecialties.filter(us => {
        const { user } = us;
        const returned = specialtyExisted(user.id, rulesUsersId);
        if (returned) {
          return us;
        }
      });
      const doctors = updatedUserSpecialties.map(({ user }) =>
        R.pick(['id', 'name'])(user)
      );
      return { ...s, doctors: doctors };
    });
    return { ...b, specialties: returnedSpecialties };
  });
  return updatedBranches;
};

const byOrganization = async organizationId => {
  const branches = await prisma.branch.findMany({
    where: { organizationId },
    include: {
      specialties: {
        include: { userSpecialties: { include: { user: true } } },
      },
    },
  });
  const updatedBranches = branches.map(b => {
    const { specialties } = b;
    const returnedSpecialties = specialties.map(s => {
      const { userSpecialties } = s;
      const doctors = userSpecialties.map(({ user }) =>
        R.pick(['id', 'name'])(user)
      );
      return { ...s, doctors: doctors };
    });
    return { ...b, specialties: returnedSpecialties };
  });
  return updatedBranches;
};

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
