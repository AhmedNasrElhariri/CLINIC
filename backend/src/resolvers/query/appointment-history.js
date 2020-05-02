import { prisma } from '@';

const appointmentHistory = async (_, { id }) => {
  const appointment = await prisma.appointment.findOne({
    where: { id },
  });

  return prisma.appointment.findMany({
    where: {
      archived: true,
      patient: {
        id: appointment.patientId,
      },
      specialty: appointment.specialty,
    },
  });
};

export default appointmentHistory;
