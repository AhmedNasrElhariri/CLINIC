import { prisma } from '@';
import { APPOINTMENTS_TYPES, APPOINTMENTS_STATUS } from '@/utils/constants';

const addCourse = async (_, { course }, { userId }) => {
  const {
    patientId,
    courseDefinitionId,
    price,
    paid,
    discount,
    sessions,
  } = course;
  return prisma.course.create({
    data: {
      price,
      paid,
      discount,
      user: {
        connect: {
          id: userId,
        },
      },
      doctor: {
        connect: {
          id: userId,
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
              id: 'ce2e9cd3-5d58-4866-b0b3-a9c03fcd4fbc',
            },
          },
          date,
        })),
      },
    },
  });
};

export default addCourse;
