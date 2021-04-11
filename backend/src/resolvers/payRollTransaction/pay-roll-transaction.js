import { prisma } from '@';

const payRollUser = ({ id }) => {
  return prisma.payRollTransaction.findOne({ where: { id } }).payRollUser();
};

export default payRollUser;
