import { prisma } from '@';
import { onAppointmentEdit } from '@/services/notification.service';
import { APPOINTMENTS_STATUS } from '@/utils/constants';

const adjustAppointment = async (_, { id, date }, { userId }) => {
  const persistedAppt = await prisma.appointment.findUnique({
    where: { id },
  });

  const newAppointment = await prisma.appointment.update({
    data: { date, status: APPOINTMENTS_STATUS.SCHEDULED },
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
