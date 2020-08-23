import { prisma } from '@';

const user = (_, { id }) => {
  return prisma.user.findOne({
    where: {
      id,
    },
  });
};

export default user;
