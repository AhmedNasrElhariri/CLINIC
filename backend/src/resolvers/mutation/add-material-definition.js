import { prisma } from '@';

const addMaterialDefinition = async (
  _,
  { materialDefinition },
  { userId, organizationId }
) => {
  const { ...rest } = materialDefinition;
  return prisma.materialDefinition.create({
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
    },
  });
};

export default addMaterialDefinition;
