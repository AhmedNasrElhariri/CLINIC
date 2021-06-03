import { prisma } from '@';

export const createAppointmentRevenue = async data => {
  return prisma.revenue.createMany({ data });
};

export const createAppointmentRevenueFromSessions = (userId, sessions) => {
  return sessions.map(({ name, price, number }) => ({
    date: new Date(),
    name,
    amount: price * number,
    userId,
  }));
};

export const createAppointmentBankRevenue = async data => {
  return prisma.bankRevenue.createMany({ data });
};

export const createAppointmentBankRevenueFromSessions = (
  userId,
  bank,
  sessions
) => {
  return sessions.map(({ name, price, number }) => ({
    date: new Date(),
    name,
    amount: price * number,
    userId,
    bankId: bank,
  }));
};
