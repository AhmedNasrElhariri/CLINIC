import { prisma } from '@';

const listRoles = (_, __, { organizationId }) => {
  return prisma.permissionRole.findMany({
    where: {
      organizationId,
    },
  });
};

export default listRoles;
