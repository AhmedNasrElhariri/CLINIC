import { prisma } from '@';

const appointment = async (_, { patientId }) => {
  return prisma.appointment.findMany({ where: { patientId: patientId } });
};

export default appointment;
