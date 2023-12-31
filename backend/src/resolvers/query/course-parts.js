import { prisma } from '@';

const courseParts = (_, { courseId }) => {
  return prisma.coursePart.findMany({
    where: {
      courseId: courseId,
    },
    include: {
      part: true,
    },
    orderBy: [
      {
        seq: 'asc',
      },
    ],
  });
};

export default courseParts;
