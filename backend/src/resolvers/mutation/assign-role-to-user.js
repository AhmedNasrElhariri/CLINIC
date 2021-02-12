import { prisma } from '@';

const assignRoleToUser = async (_, { roleId, userId }) => {
  return prisma.user
    .update({
      data: {
        role: {
          connect: {
            id: roleId,
          },
        },
      },
      where: {
        id: userId,
      },
    })
    .then(() => true);
};

export default assignRoleToUser;
