import { prisma } from '@';

const setAppointmentDone = (_, { id }) => {
  return prisma.appointment.update({
    data: { status: 'Done' },
    where: { id },
  });
};

export default setAppointmentDone;
