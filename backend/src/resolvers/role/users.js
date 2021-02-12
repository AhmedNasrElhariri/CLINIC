import { prisma } from '@';

const users = ({ id }) => {
  return prisma.permissionRole.findOne({ where: { id } }).users();
};

export default users;
