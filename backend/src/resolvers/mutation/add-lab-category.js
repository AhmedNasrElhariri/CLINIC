import { prisma } from '@';

const addLabCategory = async (_, { labCategory }, { userId ,organizationId }) => {
  return prisma.labCategory.create({
    data: {
      ...labCategory,
      user: {
        connect: {
          id: userId,
        },
      },
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addLabCategory;
