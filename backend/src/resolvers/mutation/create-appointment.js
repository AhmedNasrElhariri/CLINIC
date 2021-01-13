import { prisma } from '@';

import moment from 'moment';
import { getStartOfDay, getEndOfDay } from '@/services/date.service';
import { validDate } from '@/services/appointment.service';
import { APIExceptcion } from '@/services/erros.service';
import { getClinicDoctoryByClinicId } from '@/services/clinic';
import { onAppointmentCreate } from '@/services/notification.service';
import { APPOINTMENTS_STATUS } from '@/utils/constants';

const getDayAppointments = (day, doctorId) => {
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
      doctorId,
    },
  });
};

const isBeforeNow = date => moment(date).isBefore(moment(), 'minute');

const createAppointment = async (
  _,
  { input: { patient, clinicId, ...appointment } },
  { userId }
) => {
  const doctor = await getClinicDoctoryByClinicId(clinicId);
  const appointments = await getDayAppointments(appointment.date, doctor.id);

  if (!(appointment.type === 'Urgent' || appointment.type === 'Surgery')) {
    if (!validDate(appointment.date, appointments)) {
      throw new APIExceptcion('Time slot already reversed');
    }

    if (isBeforeNow(appointment.date)) {
      throw new APIExceptcion('Can not set to past time');
    }
  }

  const createdAppointment = await prisma.appointment.create({
    data: {
      ...appointment,
      specialty: 'Dentistry',
      status: 'Scheduled',
      patient: {
        connect: {
          id: patient,
        },
      },
      clinic: {
        connect: {
          id: clinicId,
        },
      },
      doctor: {
        connect: {
          id: doctor.id,
        },
      },
    },
  });

  if (appointment.type !== 'Surgery') {
    onAppointmentCreate({
      userId: doctor.id,
      notifierId: userId,
      clinicId,
      appointment: createdAppointment,
    });
  }

  return createdAppointment;
};

export default createAppointment;
