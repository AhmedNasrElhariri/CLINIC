import { prisma } from '@';
import { GetLevel } from '@/services/get-level';
export const createAppointmentRevenue = async data => {
  return prisma.revenue.createMany({ data });
};

export const createAppointmentBankRevenue = async data => {
  return prisma.bankRevenue.createMany({ data });
};

export const createAppointmentRevenueFromSessions = (
  userId,
  sessions,
  organizationId,
  branchId,
  date,
  specialtyId,
  userID,
  patientId
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
      userID && { doctorId: userID },
      patientId && { patientId: patientId }
    )
  );
};

export const createAppointmentBankRevenueFromSessions = (
  userId,
  sessions,
  organizationId,
  branchId,
  date,
  specialtyId,
  userID,
  bank,
  patientId
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
        bankId: bank,
      },
      specialtyId && { specialtyId },
      branchId && { branchId },
      userID && { doctorId: userID },
      patientId && { patientId: patientId }
    )
  );
};
