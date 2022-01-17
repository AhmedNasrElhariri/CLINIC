import { prisma } from '@';
const editCourseUnits = async (_, { courseId, consumed, type }, { userId }) => {
  const data = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      courseDefinition: true,
      patient: true,
    },
  });
  if (type === 'addNewUnits') {
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
        consumed: data.consumed + consumed,
      },
    });
  } else {
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
        consumed: consumed,
      },
    });
  }
};

export default editCourseUnits;
