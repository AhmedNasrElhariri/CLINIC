import { prisma } from '@';

const patients = async (_, { name }, { user, organizationId }) => {
  return prisma.patient.findMany({
    where: {
      organizationId,
      OR: [
        {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        {
          phoneNoTwo: {
            contains: name,
          },
        },

        {
          phoneNo: {
            contains: name,
          },
        },
      ],
    },
    orderBy: [
      {
        updatedAt: 'desc',
      },
    ],
    skip: 0,
    take: 20,
  });
};

export default patients;
