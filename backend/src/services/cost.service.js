import { prisma } from '@';
import { GetLevel } from '@/services/get-level';

const doCostOfSession = sessions => {
  return sessions.some(({ cost }) => cost > 0);
};
const createAppointmentSessionCost = async data => {
  return Promise.all(data.map(d => prisma.expense.create({ data: d })));
};
const createCostOfSessionsFromAppointment = (
  userId,
  sessions,
  organizationId,
  branchId,
  date,
  specialtyId,
  userID
) => {
  const level = GetLevel(branchId, specialtyId, userID);
  return sessions.map(({ name, cost }) =>
    Object.assign(
      {
        date: new Date(date),
        name: name + ' - cost of session',
        expenseType: 'Cost Of Session',
        amount: cost,
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

const createAppointmentDoctorCost = async data => {
  return Promise.all(data.map(d => prisma.doctorFees.create({ data: d })));
};
const createCostOfDoctorsFromAppointment = (
  userId,
  sessions,
  organizationId,
  branchId,
  date,
  specialtyId,
  userID,
  doctorSessions,
  id
) => {
  let newSessions = [];
  sessions.forEach(({ name, price, number, cost, id: sessionID }) => {
    const doctorSession = doctorSessions.find(
      ({ sessionId }) => sessionId === sessionID
    );

    if (doctorSession) {
      const {
        feesCalculationMethod,
        feesCalculationType,
        fees,
      } = doctorSession;
      const doctorFees =
        feesCalculationType === 'fixed'
          ? fees * number
          : feesCalculationMethod === 'before'
          ? fees * price * number * 0.01
          : (price - (cost ? cost : 0)) * fees * number * 0.01;
      const session = Object.assign(
        {
          name: name,
          amount: doctorFees,
          status: 'Draft',
          organizationId,
          userId,
          sessionId: sessionID,
          appointmentId: id,
        },
        cost && { cost },
        specialtyId && { specialtyId },
        branchId && { branchId },
        userID && { doctorId: userID }
      );
      newSessions.push(session);
    }
  });
  console.log(newSessions, 'newSessions');
  return newSessions;
};

export const CostServices = async (
  userId,
  sessions,
  organizationId,
  branchId,
  date,
  specialtyId,
  userID,
  id
) => {
  const doctorSessions = await prisma.doctorSessionDefination.findMany({
    where: { doctorId: userID },
  });
  doCostOfSession(sessions) &&
    (await createAppointmentSessionCost(
      createCostOfSessionsFromAppointment(
        userId,
        sessions,
        organizationId,
        branchId,
        date,
        specialtyId,
        userID
      )
    ));
  doctorSessions.length > 0 &&
    (await createAppointmentDoctorCost(
      createCostOfDoctorsFromAppointment(
        userId,
        sessions,
        organizationId,
        branchId,
        date,
        specialtyId,
        userID,
        doctorSessions,
        id
      )
    ));
};
