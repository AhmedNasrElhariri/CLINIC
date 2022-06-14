import { prisma } from '@';
const editCourseDoctor = async (_, { courseId, doctorId }) => {
  const data = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });
  const { courseDefinitionId } = data;
  return prisma.course.update({
    where: {
      id: courseId,
    },
    data: Object.assign(
      {
        patient: {
          connect: {
            id: data.patientId,
          },
        },
        user: {
          connect: {
            id: data.userId,
          },
        },
        doctor: {
          connect: {
            id: doctorId,
          },
        },
        paid: data.paid,
        price: data.price,
      },
      courseDefinitionId && {
        courseDefinition: {
          connect: {
            id: courseDefinitionId,
          },
        },
      }
    ),
  });
};

export default editCourseDoctor;
