import { prisma } from '@';
const editCourseUnits = async (_, { courseId, consumed, type }, { userId }) => {
  const data = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      patient: true,
    },
  });
  const { courseDefinitionId } = data;
  if (type === 'addNewUnits') {
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
              id: data.doctorId,
            },
          },
          consumed: data.consumed + consumed,
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
  } else {
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
              id: data.doctorId,
            },
          },
          consumed: consumed,
        },
        courseDefinitionId && {
          courseDefinition: {
            connect: {
              id: data.courseDefinitionId,
            },
          },
        }
      ),
    });
  }
};

export default editCourseUnits;
