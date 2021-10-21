import { prisma } from '@';

const MyPatientView = (_, { id }, { userId }) => {
  return prisma.patientView.findUnique({
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
    where: {
      id,
    },
  });
};

export default MyPatientView;
