import { prisma } from '@';
import { onAppointmentEdit } from '@/services/notification.service';

const adjustAppointment = async (_, { id, date }, { userId }) => {
  const persistedAppt = await prisma.appointment.findOne({
    where: { id },
    include: {
      clinic: true,
    },
  });

  const newAppointment = await prisma.appointment.update({
    data: { date },
    where: { id },
  });

  onAppointmentEdit({
    userId: persistedAppt.doctorId,
    notifierId: userId,
    clinic: persistedAppt.clinic,
    oldDate: persistedAppt.date,
    newDate: newAppointment.date,
  });

  return newAppointment;
};

export default adjustAppointment;
