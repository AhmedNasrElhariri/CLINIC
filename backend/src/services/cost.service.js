import { prisma } from '@';

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
  id,
  referedStatus
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
          ? fees
          : feesCalculationMethod === 'before'
          ? price * number * (fees / 100)
          : (price * number - (cost ? cost : 0)) * (fees / 100);
      const session = Object.assign(
        {
          name: name,
          amount: doctorFees,
          status: 'Draft',
          organizationId,
          userId,
          sessionId: sessionID,
          appointmentId: id,
          totalPrice: price * number,
          unitPrice: price,
          numberOfUnits: number,
        },
        cost && { cost },
        specialtyId && { specialtyId },
        branchId && { branchId },
        userID && { doctorId: userID },
        referedStatus && { referedStatus: referedStatus }
      );
      newSessions.push(session);
    }
  });
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
  id,
  referedStatus
) => {
  const referedDoctor = referedStatus === 'Debit' ? false : true;
  const doctorSessions = await prisma.doctorSessionDefination.findMany({
    where: { doctorId: userID, referedDoctor: referedDoctor },
  });

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
        id,
        referedStatus
      )
    ));
};
