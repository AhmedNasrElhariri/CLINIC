import { prisma } from '@';
import { getAppointmentNextStatus } from '@/services/appointment.service';
import { APPOINTMENTS_STATUS } from '@/utils/constants';

const archiveAppointment = async (_, { id }) => {
  const persistedAppointment = await prisma.appointment.findOne({
    where: {
      id,
    },
  });

  const status = getAppointmentNextStatus(
    persistedAppointment.status,
    APPOINTMENTS_STATUS.ARCHIVED
  );

  return prisma.appointment.update({
    data: { status },
    where: { id },
  });
};

export default archiveAppointment;
