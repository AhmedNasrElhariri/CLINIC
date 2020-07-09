import { prisma } from '@';

const mySnippets = (_, __, { userId }) => {
  return prisma.snippet.findMany({
    where: {
      userId,
    },
  });
};

export default mySnippets;
