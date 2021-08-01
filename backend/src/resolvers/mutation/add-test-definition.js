import { prisma } from '@';

const addLabDefinition = async (
  _,
  { labDefinition },
  { userId, organizationId }
) => {
  const { categoryId, ...rest } = labDefinition;
  return prisma.labDefinition.create({
    data: {
      ...rest,
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
      category: {
        connect: {
          id: categoryId,
        },
      },
    },
  });
};

export default addLabDefinition;
