import { prisma } from '@';
<<<<<<< HEAD
const editCourse = async (_, { courseId, paid }) => {
  const data = await prisma.course.findOne({
=======
const editCourse = async (_, { courseId, paid }, { userId }) => {
  const data = await prisma.course.findUnique({
>>>>>>> 27c3281... resolve the bugs
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
          id: data.doctorId,
        },
      },
      paid:
        paid === data.price || paid >= data.price
          ? data.price
          : paid + data.paid,
      price: data.price,
    },
  });
};

export default editCourse;
