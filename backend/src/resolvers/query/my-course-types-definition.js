import { prisma } from '@';

const myCourseTypesDefinition = async (_, __, { user, organizationId }) => {
  return prisma.courseTypeDefinition.findMany({
    where: {
      organizationId: organizationId,
    },
  });
};

export default myCourseTypesDefinition;
