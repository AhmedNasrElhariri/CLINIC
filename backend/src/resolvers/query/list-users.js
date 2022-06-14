import { prisma } from '@';

const listUsers = (_, __,{ organizationId }) => {
  return prisma.user.findMany({
    where: {
      organizationId,
    },
    include:{
      specialties:true,
      role:true,
    }
  });
};

export default listUsers;
