import { prisma } from '@';

import moment from 'moment';
import { getStartOfDay, getEndOfDay } from '@/services/date.service';
import { validDate } from '@/services/appointment.service';
import { APIExceptcion } from '@/services/erros.service';
import { onAppointmentCreate } from '@/services/notification.service';
import { APPOINTMENTS_STATUS, APPOINTMENTS_TYPES } from '@/utils/constants';
import { formatDateFull } from '@/services/date.service';

// const accountSid = 'AC09bda433375a5645246e6bacd9588605';
// const authToken = '6262a4cebde03d1fac0f5d1a207766ed';
// const client = require('twilio')(accountSid, authToken);

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

const createAppointment = async (_, { appointment }, { userId: creator }) => {
  const {
    patientId,
    userId,
    branchId,
    specialtyId,
    waiting,
    courseId,
    sessionId,
    ...rest
  } = appointment;
  const creatorId = creator ? creator : userId;
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

  const createdAppointment = await prisma.appointment.create({
    data: Object.assign(
      {
        ...rest,
        status: appointmentType,
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
  const PATIENT = await prisma.patient.findUnique({
    where: {
      id: patientId,
    },
  });
  // const updatedDate = formatDateFull(appointment.date);
  // const { phoneNo } = PATIENT;
  // const receiverPhoneNo = '+2' + phoneNo;
  // const originalMessage = 'You have Appointment at ' + updatedDate;
  // client.messages
  //   .create({
  //     from: '+19853154551', // the phone number of the application owner // add 'whatsapp:+...'
  //     body: originalMessage,
  //     to: receiverPhoneNo, // add 'whatsapp:+...'
  //   })
  //   .then(message => console.log(message))
  //   .catch(err => {
  //     console.log(err, 'EEEEEEEEEEEE');
  //   });
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
