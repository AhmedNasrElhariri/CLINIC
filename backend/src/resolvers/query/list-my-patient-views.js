import { prisma } from '@';

const listMyPatientViews = (_, __, { userId }) => {
  return prisma.patientView.findMany({
    include: {
      fieldGroups: {
        orderBy: {
          order: 'asc',
        },
        include: {
          fields: {
            orderBy: {
              order: 'asc',
            },
          },
        },
      },
      doctor: true,
    },
    orderBy: {
      id: 'asc',
    },
    where: {
      userId,
    },
  });
};

export default listMyPatientViews;
