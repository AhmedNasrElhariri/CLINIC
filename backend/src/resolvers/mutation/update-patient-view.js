import { prisma } from '@';

const updatePatientView = async (_, { view, viewId }, { userId }) => {
  const { name, userId: doctorId, fieldGroups } = view;
  return prisma.patientView
    .update({
      data: {
        name,
        doctor: {
          connect: {
            id: doctorId,
          },
        },
        user: {
          connect: { id: userId },
        },
        fieldGroups: {
          upsert: fieldGroups.map(fg => ({
            update: {
              ...fg,
              fields: {
                upsert: fg.fields.map(f => ({
                  update: { ...f },
                  create: { ...f },
                  where: {
                    id: f.id || '',
                  },
                })),
              },
            },
            create: {
              ...fg,
              fields: {
                create: fg.fields.map(f => ({
                  ...f,
                })),
              },
            },
            where: {
              id: fg.id || '',
            },
          })),
        },
      },
      where: {
        id: viewId,
      },
    })
    .then(() => true)
    .catch(err => {
      return false;
    });
};

export default updatePatientView;
