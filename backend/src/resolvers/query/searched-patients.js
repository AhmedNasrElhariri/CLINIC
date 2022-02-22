import { prisma } from '@';

const patients = async (_, { name }, { user, organizationId }) => {
  return prisma.patient.findMany({
    where: {
      organizationId,
      OR: [
        {
          phoneNo: {
            contains: name,
          },
        },
        {
          name: {
            contains: name,
            mode: 'insensitive',
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
