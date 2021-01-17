import { prisma } from '@';

const createView = async (_, { view }, { userId }) => {
  const { name, type, fieldGroups } = view;

  return prisma.view
    .create({
      data: {
        name,
        type,
        user: {
          connect: { id: userId },
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

export default createView;
