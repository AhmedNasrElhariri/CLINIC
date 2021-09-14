import { prisma } from '@';

const myMaterialsDefinition = (_, __, { userId, organizationId }) => {
  return prisma.materialDefinition.findMany({
    where: {
      organizationId,
    },
  });
};

export default myMaterialsDefinition;
