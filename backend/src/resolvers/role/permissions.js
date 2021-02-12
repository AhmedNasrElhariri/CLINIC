import { prisma } from '@';

const permissions = ({ id }) => {
  return prisma.permissionRole.findOne({ where: { id } }).permissions();
};

export default permissions;
