import { prisma } from '@';
import { onAppointmentEdit } from '@/services/notification.service';
import { APPOINTMENTS_STATUS } from '@/utils/constants';

const adjustAppointment = async (
  _,
  { id, date, branchId, specialtyId, userId: userID },
  { userId }
) => {
  const persistedAppt = await prisma.appointment.findUnique({
    where: { id },
  });
  const newAppointment = await prisma.appointment.update({
    data: Object.assign(
      {
        date,
        status: APPOINTMENTS_STATUS.SCHEDULED,
        user: {
          connect: {
            id: userId,
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
      userID && {
        doctor: {
          connect: {
            id: userID,
          },
        },
      }
    ),
    where: { id },
  });
  console.log(newAppointment, 'slssssssssss');
  onAppointmentEdit({
    userId: persistedAppt.userId,
    notifierId: userId,
    oldDate: persistedAppt.date,
    newDate: newAppointment.date,
  });

  return newAppointment;
};

export default adjustAppointment;
