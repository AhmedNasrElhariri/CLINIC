import { prisma } from '@';

const CoursePayments = (_, { courseId }) => {
  return prisma.coursePayment.findMany({
    where: {
      courseId: courseId,
    },
    include: {
      user: true,
    },
  });
};

export default CoursePayments;
