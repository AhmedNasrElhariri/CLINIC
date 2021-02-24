import { prisma } from '@';

export const createAppointmentRevenue = async (userId, sessions) => {
  const data = sessions.map(({ name, price }) => ({
    date: new Date(),
    name,
    amount: price,
    user: {
      connect: {
        id: userId,
      },
    },
  }));

  return Promise.all(data.map(d => prisma.revenue.create({ data: d })));
};
