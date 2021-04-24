import { prisma } from '@';

const user = ({ id }) => {
  return prisma.payrollUser.findUnique({ where: { id } }).user();
};

export default user;
