import { prisma } from '@';

const myPatientCourses = (_, { patientId }) => {
  return prisma.course.findMany({
    where: {
      patientId: patientId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};

export default myPatientCourses;
