import { prisma } from '@';

const createA = permissions => {
  // permissions.map(p => {});
};

const createRole = async (_, { role }, { organizationId }) => {
  const { name, permissions } = role;
  console.dir({ name, permissions });

  const permissionsArgs = permissions.map(({ level, rules }) => ({
    create: {
      organization: {
        connect: {
          id: organizationId,
        },
      },
      level: level,
      rules: rules.map(({ branchId, specialtyId, userId }) => ({
        create: Object.assign(
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
        ),
        // create: {
        //   organization: {
        //     connect: {
        //       id: organizationId,
        //     },
        //   },
        //   branch: {
        //     connect: {
        //       id: branchId,
        //     },
        //   },
        //   specialty: {
        //     connect: {
        //       id: specialtyId,
        //     },
        //   },
        //   user: {
        //     connect: {
        //       id: userId,
        //     },
        //   },
        // },
      })),
    },
  }));

  return prisma.role.create({
    data: {
      name,
      permissions: permissionsArgs,
      // permissions: {
      //   create: {
      //     organization: {
      //       connect: {
      //         id: organizationId,
      //       },
      //     },
      //     level: 'Organization',
      //     rules: {
      //       create: {
      //         organization: {
      //           connect: {
      //             id: organizationId,
      //           },
      //         },
      //         branch: {
      //           connect,
      //         },
      //       },
      //     },
      //   },
      // },
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default createRole;
