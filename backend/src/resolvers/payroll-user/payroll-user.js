import { prisma } from '@';

const user = ({ id }) => {
  return prisma.payrollUser.findOne({ where: { id } }).user();
};

export default user;
