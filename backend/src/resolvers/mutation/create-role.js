import { prisma } from '@';

const createPermissionRule = ({
  organizationId,
  branchId,
  specialtyId,
  userId,
}) => {
  // permissions.map(p => {});
};

const createRole = async (_, { role }, { organizationId }) => {
  const { name, permissions } = role;

  const permissionsArgs = permissions.map(({ level, all, actionId, rules }) =>
    Object.assign(
      {
        organization: {
          connect: {
            id: organizationId,
          },
        },
        action: {
          connect: {
            id: actionId,
          },
        },
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
            // rules: rules.map(({ branchId, specialtyId, userId }) => ({
            //   create: Object.assign(
            //     {
            //       organization: {
            //         connect: {
            //           id: organizationId,
            //         },
            //       },
            //     },
            //     branchId && {
            //       branch: {
            //         connect: {
            //           id: branchId,
            //         },
            //       },
            //     },
            //     specialtyId && {
            //       specialty: {
            //         connect: {
            //           id: specialtyId,
            //         },
            //       },
            //     },
            //     userId && {
            //       user: {
            //         connect: {
            //           id: userId,
            //         },
            //       },
            //     }
            //   ),
            // })),
          }
    )
  );
  // const permissionsArgs = permissions.map(({ level, all, rules }) => ({
  //   create: {
  //     organization: {
  //       connect: {
  //         id: organizationId,
  //       },
  //     },
  //     level: level,
  //     rules: rules.map(({ branchId, specialtyId, userId }) => ({
  //       create: Object.assign(
  //         {
  //           organization: {
  //             connect: {
  //               id: organizationId,
  //             },
  //           },
  //         },
  //         branchId && {
  //           branch: {
  //             connect: {
  //               id: branchId,
  //             },
  //           },
  //         },
  //         specialtyId && {
  //           specialty: {
  //             connect: {
  //               id: specialtyId,
  //             },
  //           },
  //         },
  //         userId && {
  //           user: {
  //             connect: {
  //               id: userId,
  //             },
  //           },
  //         }
  //       ),
  //     })),
  //   },
  // }));

  return prisma.permissionRole.create({
    data: {
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
  });
};

export default createRole;
