import { prisma } from '@';

const createOrUpdateRole = async (_, { role }, { organizationId }) => {
  const { id, name, permissions } = role;

  const permissionsArgs = permissions.map(({ level, all, action, rules }) =>
    Object.assign(
      {
        organization: {
          connect: {
            id: organizationId,
          },
        },
        action,
        level: level,
      },
      all
        ? { all: true }
        : {
            rules: {
              create: rules.map(({ branchId, specialtyId, userId }) =>
                Object.assign(
                  {
                    organization: {
                      connect: {
                        id: organizationId,
                      },
                    },
                  },
                  branchId && {
                    branch: {
                      connect: {
                        id: branchId,
                      },
                    },
                  },
                  specialtyId && {
                    specialty: {
                      connect: {
                        id: specialtyId,
                      },
                    },
                  },
                  userId && {
                    user: {
                      connect: {
                        id: userId,
                      },
                    },
                  }
                )
              ),
            },
          }
    )
  );

  return prisma.permissionRole.upsert({
    create: {
      name,
      permissions: {
        create: permissionsArgs,
      },
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
    update: {
      name,
      permissions: {
        deleteMany: {},
        create: permissionsArgs,
      },
    },
    where: {
      id: id || '',
    },
  });
};

export default createOrUpdateRole;
