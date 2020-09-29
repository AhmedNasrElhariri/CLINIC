import { prisma } from '@';

export const createAppointmentRevenue = async (id, sessions) => {
  const appointment = await prisma.appointment.findOne({
    where: { id },
    include: {
      clinic: {
        select: {
          id: true,
        },
      },
    },
  });

  const { clinic } = appointment;

  const data = sessions.map(({ name, price }) => ({
    clinic: {
      connect: {
        id: clinic.id,
      },
    },
    date: new Date(),
    name,
    amount: price,
  }));

  return Promise.all(data.map(d => prisma.revenue.create({ data: d })));
};
