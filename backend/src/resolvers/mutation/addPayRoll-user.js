import { prisma } from '@';

const payRollUser = async (_, { payRollUser }) => {
  const {userId, salary} = payRollUser;
  return prisma.payRollUser.create({
    data: {
      id: userId,
      salary: salary,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default payRollUser;
