import { prisma } from '@';

const myCourses = async (_, { patientId }) => {
  const courses = await prisma.course.findMany({
    where: {
      patientId: patientId,
    },
  });
  return courses;
};

export default myCourses;
