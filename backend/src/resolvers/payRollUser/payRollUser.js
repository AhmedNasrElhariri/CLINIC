import { prisma } from '@';

const user = ({ id }) => {
  return prisma.payRollUser.findOne({ where: { id } }).user();
};

export default user;
