import { prisma } from '@';

const listRoles = (_, { organizationId }) => {
  return prisma.permissionRole.findMany({
    where: {
      organizationId,
    },
  });
};

export default listRoles;
