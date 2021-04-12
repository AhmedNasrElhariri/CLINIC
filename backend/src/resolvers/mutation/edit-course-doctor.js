import { prisma } from '@';
const editCourseDoctor = async (_, { courseId, doctorId }) => {
  const data = await prisma.course.findOne({
    where: {
      id: courseId,
    },
  });
  return prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      patient: {
        connect: {
          id: data.patientId,
        },
      },
      courseDefinition: {
        connect: {
          id: data.courseDefinitionId,
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
  });
};

export default editCourseDoctor;
