import { prisma } from '@';

import moment from 'moment';
import { getStartOfDay, getEndOfDay } from '@/services/date.service';
import { validDate } from '@/services/appointment.service';
import { APIExceptcion } from '@/services/erros.service';
import { onAppointmentCreate } from '@/services/notification.service';
import { APPOINTMENTS_STATUS, APPOINTMENTS_TYPES } from '@/utils/constants';

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

const createAppointment = async (_, { appointment }, { userId: creatorId }) => {
  const { patientId, userId, courseId, ...rest } = appointment;

  const appointments = await getDayAppointments(appointment.date, userId);

  if (
    !(
      appointment.type === APPOINTMENTS_TYPES.Urgent ||
      appointment.type === APPOINTMENTS_TYPES.Surgery
    )
  ) {
    if (!validDate(appointment.date, appointments)) {
      throw new APIExceptcion('Time slot already reversed');
    }

    if (isBeforeNow(appointment.date)) {
      throw new APIExceptcion('Can not set to past time');
    }
  }

  const createdAppointment = await prisma.appointment.create({
    data: {
      ...rest,
      status: APPOINTMENTS_STATUS.SCHEDULED,
      patient: {
        connect: {
          id: patientId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
      courses: {
        create: {
          course: {
            connect: {
              id: courseId,
            },
          },
        },
      },
    },
  });

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
