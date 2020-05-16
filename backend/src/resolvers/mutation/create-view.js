import { prisma } from '@';

const createView = async (_, { view }, { userId }) => {
  const { name, fieldGroups } = view;

  return prisma.view
    .create({
      data: {
        name,
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
