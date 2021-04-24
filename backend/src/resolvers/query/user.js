import { prisma } from '@';

const user = (_, { id }) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export default user;
