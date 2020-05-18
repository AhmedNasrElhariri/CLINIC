import { prisma } from '@';

const appointmentHistory = async (_, { id }) => {
  const appointment = await prisma.appointment.findOne({
    where: { id },
  });

  return prisma.appointment.findMany({
    where: {
      status: 'Archived',
      patient: {
        id: appointment.patientId,
      },
    },
  });
};

export default appointmentHistory;
