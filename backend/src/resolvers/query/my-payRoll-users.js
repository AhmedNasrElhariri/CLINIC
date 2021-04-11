import { prisma } from '@';

const myPayRollUsers = (_,) => {
  return prisma.payRollUser.findMany({
  });
};

export default myPayRollUsers;
