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

const createAppointment = async (_, { input: { patient, ...appointment } }) => {
  const appointments = await getDayAppointments();
  const date = calculateAppointmentTime(appointments, appointment.date);

  return prisma.appointment.create({
    data: {
      ...appointment,
      specialty: 'Dentistry',
      patient: {
        connect: {
          id: patient,
        },
      },
      date,
      doctor: {
        connect: {
          id: '6625951a-3a69-46ee-ab5f-d0f523d463de',
        },
      },
    },
  });
};

export default createAppointment;
