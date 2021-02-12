import { prisma } from '@';
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
  // const userIds = rules.map(r => r.userId);
  // const users = prisma.user.findMany({
  //   where: { id: { in: userIds } },
  //   include: { specialties: { include: { specialty: id } } },
  // });
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

const listBranchesTree = async (_, { id }, { userId, organizationId }) => {
  const permission = await prisma.permission.findOne({
    where: { id },
    include: { rules: true },
  });

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
