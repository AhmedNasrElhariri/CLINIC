import { prisma } from '@';

const archiveAppointment = (_, { id }) => {
  return prisma.appointment.update({
    data: { status: 'Archived' },
    where: { id },
  });
};

export default archiveAppointment;
