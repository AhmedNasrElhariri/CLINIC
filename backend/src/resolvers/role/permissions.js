import { prisma } from '@';

const permissions = ({ id }) => {
  return prisma.permissionRole.findUnique({ where: { id } }).permissions();
};

export default permissions;
