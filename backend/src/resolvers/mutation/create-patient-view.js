import { prisma } from '@';

const createPatientView = async (_, { view }, { userId }) => {
  const { name, userId: doctorId, fieldGroups } = view;

  return prisma.patientView
    .create({
      data: {
        name,
        user: {
          connect: { id: userId },
        },
        doctor: {
          connect: {
            id: doctorId,
          },
        },
        fieldGroups: {
          create: fieldGroups.map(fg => ({
            ...fg,
            fields: {
              create: fg.fields,
            },
          })),
        },
      },
    })
    .then(() => true)
    .catch(() => false);
};

export default createPatientView;
