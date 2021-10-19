import { prisma } from '@';
import { APPOINTMENTS_STATUS } from '@/utils/constants';
const appointment = async (_, { patientId, status }) => {
  return prisma.appointment.findMany({
    where: {
      status: status,
      patientId: patientId,
    },
    orderBy: {
      date: 'asc',
    },
  });
};

export default appointment;
