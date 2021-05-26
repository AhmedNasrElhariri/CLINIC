import { prisma } from '@';

const myCoursesDefinition = (_, __, { organizationId }) => {
  return prisma.courseDefinition.findMany({
    where: {
      organizationId,
    },
  });
};

export default myCoursesDefinition;
