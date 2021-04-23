import { prisma } from '@';
import {
  APPOINTMENTS_TYPES,
  APPOINTMENTS_STATUS,
  COURSE_STATUS,
} from '@/utils/constants';

const addCourse = async (_, { course }, { userId }) => {
  const {
    patientId,
    courseDefinitionId,
    price,
    paid,
    discount,
    sessions,
    doctorId,
  } = course;
  const startDate = sessions.length > 0 ? sessions[0] : new Date();
  const endDate =
    sessions.length > 0 ? sessions[sessions.length - 1] : new Date();
  const courseDef = await prisma.course.create({
    data: {
      price,
      paid,
      discount,
      startDate,
      endDate,
      status: COURSE_STATUS.INPROGRESS,
      user: {
        connect: {
          id: userId,
        },
      },
      doctor: {
        connect: {
          id: doctorId,
        },
      },
      patient: {
        connect: {
          id: patientId,
        },
      },
      courseDefinition: {
        connect: {
          id: courseDefinitionId,
        },
      },
      sessions: {
        create: sessions.map(date => ({
          type: APPOINTMENTS_TYPES.Session,
          status: APPOINTMENTS_STATUS.SCHEDULED,
          patient: {
            connect: {
              id: patientId,
            },
          },
          user: {
            connect: {
              id: doctorId,
            },
          },
          date,
        })),
      },
    },
    include: {
      courseDefinition: true,
      patient: true,
    },
  });
  const payment =
    'C' + '/' + courseDef.courseDefinition.name + '/' + courseDef.patient.name;
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
  return courseDef;
};

export default addCourse;
