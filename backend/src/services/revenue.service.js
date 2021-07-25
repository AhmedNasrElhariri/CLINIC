import { prisma } from '@';
import { GetLevel } from '@/services/get-level';
export const createAppointmentRevenue = async data => {
  return prisma.revenue.createMany({ data });
};

export const createAppointmentRevenueFromSessions = (
  userId,
  sessions,
  organizationId,
  branchId,
  date,
  specialtyId,
  userID
) => {
  const level = GetLevel(branchId, specialtyId, userID);
  return sessions.map(({ name, price, number }) =>
    Object.assign(
      {
        date: new Date(date),
        name,
        amount: price * number,
        level,
        organizationId,
        userId,
      },
      specialtyId && { specialtyId },
      branchId && { branchId },
      userID && { doctorId: userID }
    )
  );
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

// export const createAppointmentCompanyRevenue = async data => {
//   return prisma.bankRevenue.createMany({ data });
// };
