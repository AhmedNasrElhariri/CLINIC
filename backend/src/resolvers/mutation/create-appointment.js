import { prisma } from '@';
import { getStartOfDay, getEndOfDay } from '@/services/date.service';
import { validDate } from '@/services/appointment.service';
import { APIExceptcion } from '@/services/erros.service';

const getDayAppointments = day => {
  const start = getStartOfDay(day);
  const end = getEndOfDay(day);
  return prisma.appointment.findMany({
    where: {
      date: {
        gte: start,
        lte: end,
      },
    },
  });
};

const createAppointment = async (
  _,
  { input: { patient, clinicId, ...appointment } },
  { userId }
) => {
  const appointments = await getDayAppointments(appointment.date);

  if (!validDate(appointment.date, appointments)) {
    console.log('e')
    throw new APIExceptcion('Time slot already reversed');
  }

  return prisma.appointment.create({
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
          id: userId,
        },
      },
    },
  });
};

export default createAppointment;
