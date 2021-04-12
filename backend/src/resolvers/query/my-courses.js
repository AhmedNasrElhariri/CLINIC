import { prisma } from '@';

const myCourses = (_, { patientId }) => {
  return prisma.course.findMany({
    where: {
      patientId,
    },
  });
};

export default myCourses;
