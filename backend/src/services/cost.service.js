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
  return Promise.all(data.map(d => prisma.expense.create({ data: d })));
};
const createCostOfDoctorsFromAppointment = (
  userId,
  sessions,
  organizationId,
  branchId,
  date,
  specialtyId,
  userID,
  doctorSessions
) => {
  const level = GetLevel(branchId, specialtyId, userID);
  let newSessions = [];
  sessions.forEach(({ name, price, cost, id }) => {
    const doctorSession = doctorSessions.find(
      ({ sessionId }) => sessionId === id
    );

    if (doctorSession) {
      const {
        feesCalculationMethod,
        feesCalculationType,
        fees,
      } = doctorSession;
      const doctorFees =
        feesCalculationType === 'fixed'
          ? fees
          : feesCalculationMethod === 'before'
          ? fees * price * 0.01
          : (price - cost || 0) * fees * 0.01;
      const session = Object.assign(
        {
          date: new Date(date),
          name: name + ' - fees of doctor',
          expenseType: 'Fees Of Doctor',
          amount: doctorFees,
          level,
          organizationId,
          userId,
        },
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
  userID
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
        doctorSessions
      )
    ));
};
