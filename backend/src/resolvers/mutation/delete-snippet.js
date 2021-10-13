import { prisma } from '@';

const deleteSnippet = async (_, { id }) => {
  return prisma.snippet.delete({
    where: {
      id,
    },
  });
};

export default deleteSnippet;
