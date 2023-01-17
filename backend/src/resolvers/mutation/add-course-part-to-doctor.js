import { prisma } from '@';

const addCoursePartToDoctor = async (
  _,
  { doctorCoursePart },
  { organizationId }
) => {
  return prisma.doctorCoursePartDefination.create({
    data: {
      ...doctorCoursePart,
      organizationId,
    },
  });
};

export default addCoursePartToDoctor;
