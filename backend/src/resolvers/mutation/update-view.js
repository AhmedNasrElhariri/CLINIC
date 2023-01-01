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
                  update: { ...f, choices: f.choices || undefined },
                  create: { ...f, choices: f.choices || undefined },
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
                  choices: f.choices || undefined,
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
      throw new Error(err);
    });
};

export default updateView;
