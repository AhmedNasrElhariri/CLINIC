import { prisma } from '@';

const confirmedAppointment = async (_, { id }, { userId, organizationId }) => {
  const appointment = await prisma.appointment.findUnique({
    where: { id },
  });
  const { confirmed } = appointment;
  return prisma.appointment.update({
    data: { confirmed: !confirmed },
    where: { id },
  });
};

export default confirmedAppointment;
