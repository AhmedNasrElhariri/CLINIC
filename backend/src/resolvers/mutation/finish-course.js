import { prisma } from '@';
import { APPOINTMENTS_STATUS, COURSE_STATUS } from '@/utils/constants';

const finishCourse = async (_, { courseId }) => {
  const data = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });
  const { courseDefinitionId } = data;
  let status =
    new Date() > data.endDate
      ? COURSE_STATUS.FINISHED
      : data.endDate > new Date()
      ? COURSE_STATUS.EARLY_FINISHED
      : COURSE_STATUS.INPROGRESS;
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
            id: data.userId,
          },
        },
        sessions: {
          updateMany: {
            where: {
              status: APPOINTMENTS_STATUS.SCHEDULED,
            },
            data: {
              status: APPOINTMENTS_STATUS.CANCELLED,
            },
          },
        },
        status: status,
        endDate: new Date(),
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

export default finishCourse;
