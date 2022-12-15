import { prisma } from '@';
import { GetLevel } from '@/services/get-level';

export const createAppointmentRevenue = async data => {
  return Promise.all(
    data.map(d =>
      prisma.revenue.create({ data: d, tag: 'revenue from appointment' })
    )
  );
};

export const createAppointmentBankRevenue = async data => {
  return Promise.all(
    data.map(d =>
      prisma.bankRevenue.create({ data: d, tag: 'revenue from appointment' })
    )
  );
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
