import { prisma } from '@';

const appointment = async (_, { id }) => {
  const app = await prisma.appointment.findUnique({
    where: { id },
  });
  return app;
};

export default appointment;
