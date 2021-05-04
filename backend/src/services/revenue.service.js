import { prisma } from '@';

export const createAppointmentRevenue = async data => {
  return prisma.revenue.createMany({ data });
};

export const createAppointmentRevenueFromSessions = (userId, sessions) => {
  return sessions.map(({ name, price }) => ({
    date: new Date(),
    name,
    amount: price,
    userId,
  }));
};
