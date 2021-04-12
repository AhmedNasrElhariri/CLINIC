import { prisma } from '@';

const myCoursesDefinition = (_, __, { userId }) => {
  return prisma.courseDefinition.findMany({
    where: {
      userId,
    },
  });
};

export default myCoursesDefinition;
