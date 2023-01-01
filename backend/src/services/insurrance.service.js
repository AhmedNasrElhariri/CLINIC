import { prisma } from '@';
import { GetLevel } from '@/services/get-level';

export const createAppointmentInsurranceRevenue = async data => {
  return Promise.all(
    data.map(d => prisma.insuranceRevenue.create({ data: d }))
  );
};
export const createAppointmentRevenueFromInsurranceSessions = (
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
  return sessions.map(({ name, number, patientFees }) =>
    Object.assign(
      {
        date: new Date(date),
        name,
        amount: patientFees * number,
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

export const createAppointmentBankRevenueFromInsurranceSessions = (
  userId,
  sessions,
  organizationId,
  branchId,
  date,
  specialtyId,
  userID,
  patientId,
  bankId
) => {
  const level = GetLevel(branchId, specialtyId, userID);
  return sessions.map(({ name, number, patientFees }) =>
    Object.assign(
      {
        date: new Date(date),
        name,
        amount: patientFees * number,
        level,
        organizationId,
        userId,
        bankId,
      },
      specialtyId && { specialtyId },
      branchId && { branchId },
      userID && { doctorId: userID },
      patientId && { patientId: patientId }
    )
  );
};

export const createAppointmentInsurranceRevenueFromSessions = (
  userId,
  sessions,
  organizationId,
  branchId,
  date,
  specialtyId,
  userID,
  patientId,
  companyId,
  cardId
) => {
  const level = GetLevel(branchId, specialtyId, userID);
  return sessions.map(({ name, price, number, patientFees }) =>
    Object.assign(
      {
        date: new Date(date),
        name,
        amount: price * number - patientFees * number,
        level,
        organizationId,
        userId,
        companyId: companyId,
      },
      specialtyId && { specialtyId },
      branchId && { branchId },
      userID && { doctorId: userID },
      patientId && { patientId: patientId },
      cardId && { cardId: cardId }
    )
  );
};
