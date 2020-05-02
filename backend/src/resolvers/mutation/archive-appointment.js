import { prisma } from '@';

const archiveAppointment = (_, { id }) => {
  return prisma.appointment.update({ data: { archived: true }, where: { id } });
};

export default archiveAppointment;
