import { prisma } from '@';
import { getStartOfDay, getEndOfDay } from '@/services/date.service';
import { calculateAppointmentTime } from '@/services/appointment.service';

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
  { input: { patient, ...appointment } },
  { userId }
) => {
  const appointments = await getDayAppointments();
  const date = calculateAppointmentTime(appointments, appointment.date);

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
      date,
      doctor: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default createAppointment;
