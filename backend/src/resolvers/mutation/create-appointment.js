import { prisma } from '@';
import moment from 'moment';
import { getStartOfDay, getEndOfDay } from '@/services/date.service';
import { validDate } from '@/services/appointment.service';
import { APIExceptcion } from '@/services/erros.service';
import {
  onAppointmentCreate,
  createFollowUpRelation,
} from '@/services/notification.service';
import {
  APPOINTMENTS_STATUS,
  APPOINTMENTS_TYPES,
  MAX_NUMBERAPPS,
} from '@/utils/constants';
import { createAppointmentMessage } from '@/services/cron-jobs';

const getDayAppointments = (day, userId) => {
  const start = getStartOfDay(day);
  const end = getEndOfDay(day);
  return prisma.appointment.findMany({
    where: {
      date: {
        gte: start,
        lte: end,
      },
      status: {
        not: APPOINTMENTS_STATUS.CANCELLED,
      },
      type: {
        not: APPOINTMENTS_TYPES.Urgent,
      },
      userId,
    },
  });
};

const isBeforeNow = date => moment(date).isBefore(moment(), 'minute');

const createAppointment = async (
  _,
  { appointment },
  { userId: creator, organizationId }
) => {
  const {
    patientId,
    userId,
    branchId,
    specialtyId,
    waiting,
    courseId,
    sessionId,
    reference,
    sendSMS,
    appointmentId,
    followUp,
    roomId,
    ...rest
  } = appointment;
  const creatorId = creator ? creator : userId;
  let createdAppointment = {};
  const appointments = await getDayAppointments(appointment.date, userId);
  if (
    !(
      appointment.type === APPOINTMENTS_TYPES.Urgent ||
      appointment.type === APPOINTMENTS_TYPES.Surgery ||
      waiting
    )
  ) {
    if (!validDate(appointment.date, appointments)) {
      throw new APIExceptcion('Time slot already reserved');
    }
    if (isBeforeNow(appointment.date)) {
      throw new APIExceptcion('Can not set to past time');
    }
  }

  let appointmentType = APPOINTMENTS_STATUS.SCHEDULED;
  if (waiting) {
    appointmentType = APPOINTMENTS_STATUS.WAITING;
  }
  const numOfAppsOfThePatient = await prisma.appointment.count({
    where: {
      patientId,
      reference: 'Online',
      status: APPOINTMENTS_STATUS.SCHEDULED,
    },
  });
  if (numOfAppsOfThePatient >= MAX_NUMBERAPPS && reference === 'Online') {
    throw new APIExceptcion(
      'You have been reached the max number of Appointments'
    );
  }
  if (followUp) {
    const app = await prisma.appointment.findUnique({
      where: { id: appointmentId },
    });
    const { appointmentFollowUpId } = app;
    if (appointmentFollowUpId) {
      throw new APIExceptcion('This appointment has followUp already');
    }
    createdAppointment = await prisma.appointment.create({
      data: Object.assign(
        {
          ...rest,
          status: appointmentType,
          reference: reference,
          isFollowUp: true,
          patient: {
            connect: {
              id: patientId,
            },
          },
          user: {
            connect: {
              id: creatorId,
            },
          },
          doctor: {
            connect: {
              id: userId,
            },
          },
          organization: {
            connect: {
              id: organizationId,
            },
          },
        },
        roomId && {
          room: {
            connect: {
              id: roomId,
            },
          },
        },
        sessionId && {
          session: {
            connect: {
              id: sessionId,
            },
          },
        },
        specialtyId && {
          specialty: {
            connect: {
              id: specialtyId,
            },
          },
        },
        branchId && {
          branch: {
            connect: {
              id: branchId,
            },
          },
        },
        appointment.type === APPOINTMENTS_TYPES.Course && {
          courses: {
            connect: [
              {
                id: courseId,
              },
            ],
          },
        }
      ),
    });
    const createdAppId = createdAppointment.id;
    await prisma.appointment.update({
      data: { appointmentFollowUpId: createdAppId },
      where: {
        id: appointmentId,
      },
    });
  } else {
    createdAppointment = await prisma.appointment.create({
      data: Object.assign(
        {
          ...rest,
          status: appointmentType,
          reference: reference,
          patient: {
            connect: {
              id: patientId,
            },
          },
          user: {
            connect: {
              id: creatorId,
            },
          },
          doctor: {
            connect: {
              id: userId,
            },
          },
          organization: {
            connect: {
              id: organizationId,
            },
          },
        },
        sessionId && {
          session: {
            connect: {
              id: sessionId,
            },
          },
        },
        specialtyId && {
          specialty: {
            connect: {
              id: specialtyId,
            },
          },
        },
        branchId && {
          branch: {
            connect: {
              id: branchId,
            },
          },
        },
        roomId && {
          room: {
            connect: {
              id: roomId,
            },
          },
        },
        appointment.type === APPOINTMENTS_TYPES.Course && {
          courses: {
            connect: [
              {
                id: courseId,
              },
            ],
          },
        }
      ),
    });
  }

  // if (sendSMS) {
  //   createAppointmentMessage(createdAppointment);
  // }
  if (appointment.type !== APPOINTMENTS_TYPES.Surgery) {
    onAppointmentCreate({
      userId,
      notifierId: creatorId,
      appointment: createdAppointment,
    });
  }
  return createdAppointment;
};

export default createAppointment;
