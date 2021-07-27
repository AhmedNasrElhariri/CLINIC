import { prisma } from '@';

const assignRoleToUser = async (_, { roleId, userId }) => {
  return prisma.user
    .update({
      data: {
        roleId: null,
      },
      where: {
        id: userId,
      },
    })
    .then(() => true);
};

export default assignRoleToUser;
