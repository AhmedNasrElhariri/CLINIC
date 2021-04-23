import { prisma } from '@';
const editCourse = async (_, { courseId, paid }, { userId }) => {
  const data = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      courseDefinition: true,
      patient: true,
    },
  });
  const payment =
    'C' + '/' + data.courseDefinition.name + '/' + data.patient.name;
  await prisma.revenue.create({
    data: {
      name: payment,
      date: new Date(),
      amount: paid,
      user: {
        connect: {
          id: userId,
        },
      },
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
