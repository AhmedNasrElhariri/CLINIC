import { prisma } from '@';

const deletePayRollUser = async (_, { userId }) => {
  return await prisma.payRollUser.delete({
    where: {
      id: userId,
    },
  });
};

export default deletePayRollUser;
