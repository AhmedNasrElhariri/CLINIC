import { prisma } from '@';
import {
  APPOINTMENTS_TYPES,
  APPOINTMENTS_STATUS,
  COURSE_STATUS,
} from '@/utils/constants';
import { date } from 'yup';
const finishCourse = async (_, { courseId }) => {
  const data = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });
  //   const { sessions } = data;
  //   sessions.map(session => {
  //     prisma.appointment.update({
  //       where: {
  //         id: session.id,
  //       },
  //       data: {
  //         type: APPOINTMENTS_TYPES.Session,
  //         status: APPOINTMENTS_STATUS.CANCELLED,
  //         patient: {
  //           connect: {
  //             id: session.patientId,
  //           },
  //         },
  //         user: {
  //           connect: {
  //             id: session.userId,
  //           },
  //         },
  //       },
  //     });
  //   });
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
  });
};

export default finishCourse;
