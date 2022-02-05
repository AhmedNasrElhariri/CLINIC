import { prisma } from '@';

const myPatientCourses = (_, { patientId }, { organizationId }) => {
  return prisma.course.findMany({
    where: {
      patientId: patientId,
    },
    
  });
};

export default myPatientCourses;
