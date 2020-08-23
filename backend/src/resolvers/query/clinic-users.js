import { prisma } from '@';

const clinicUsers = (_, { clinicId }) => {
  return prisma.user.findMany({
    where: {
      clinics: {
        some: {
          id: clinicId,
        },
      },
    },
  });
};

export default clinicUsers;
