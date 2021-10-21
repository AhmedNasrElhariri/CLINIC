import { prisma } from '@';

const activePatientView = async (_, __, { userId }) => {
  const viewStatus = await prisma.patientViewStatus.findMany({
    where: {
      userId,
    },
  });

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
    where: {
      id: {
        in: viewStatus.map(v => v.activeViewId),
      },
    },
  });
};

export default activePatientView;
