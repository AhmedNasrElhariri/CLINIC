import { prisma } from '@';

const users = ({ id }) => {
  return prisma.permissionRole.findUnique({ where: { id } }).users();
};

export default users;
