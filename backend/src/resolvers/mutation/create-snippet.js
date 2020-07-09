import { prisma } from '@';

const createSnippet = (_, { snippet }, { userId }) => {
  return prisma.snippet.create({
    data: {
      ...snippet,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default createSnippet;
