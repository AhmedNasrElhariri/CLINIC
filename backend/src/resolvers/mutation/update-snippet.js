import { prisma } from '@';

const updateSnippet = async (_, { snippet: { id, ...snippet } }) => {
  return prisma.snippet.update({
    data: {
      ...snippet,
    },
    where: {
      id,
    },
  });
};

export default updateSnippet;
