import { prisma } from '@';

const updateView = async (_, { view, viewId }, { userId }) => {
  const { name, type, fieldGroups } = view;
  return prisma.view
    .update({
      data: {
        name,
        type,
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
      console.log(err);
      return false;
    });
};

export default updateView;
