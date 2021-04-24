import { prisma } from '@';
import { onAppointmentEdit } from '@/services/notification.service';

const adjustAppointment = async (_, { id, date }, { userId }) => {
  const persistedAppt = await prisma.appointment.findUnique({
    where: { id },
  });

  const newAppointment = await prisma.appointment.update({
    data: { date },
    where: { id },
  });

  onAppointmentEdit({
    userId: persistedAppt.userId,
    notifierId: userId,
    oldDate: persistedAppt.date,
    newDate: newAppointment.date,
  });

  return newAppointment;
};

export default adjustAppointment;
