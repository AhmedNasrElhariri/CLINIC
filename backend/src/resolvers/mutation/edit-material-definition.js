import { prisma } from '@';

const editMaterialDefinition = async (_, { materialDefinition }) => {
  const { id, ...rest } = materialDefinition;

  return prisma.materialDefinition.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editMaterialDefinition;
