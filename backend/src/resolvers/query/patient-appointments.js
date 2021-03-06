import { prisma } from '@';
import { APPOINTMENTS_STATUS } from '@/utils/constants';
const appointment = async (_, { patientId }) => {
  return prisma.appointment.findMany({
    where: {
      status: APPOINTMENTS_STATUS.SCHEDULED,
      patientId: patientId,
    },
    orderBy: {
      date: 'asc',
    },
  });
};

export default appointment;
