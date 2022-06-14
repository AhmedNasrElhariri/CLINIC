import { prisma } from '@';

const courseUnitsHistory = (_, { courseId }) => {
  return prisma.courseUnitsHistory.findMany({
    where: {
      courseId: courseId,
    },
    include: {
      user: true,
      doctor: true,
    },
  });
};

export default courseUnitsHistory;
