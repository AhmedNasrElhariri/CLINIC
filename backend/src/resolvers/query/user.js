import { prisma } from '@';

const user = (_, { id }) => {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include:{
      role:true,
    }
  });
};

export default user;
