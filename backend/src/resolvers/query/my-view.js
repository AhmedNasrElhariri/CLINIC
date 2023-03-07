import { prisma } from '@';

const myView = async (_, { id }) => {
  const vie = await prisma.view.findUnique({
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
    },
    where: {
      id,
    },
  });
  return vie;
};

export default myView;
