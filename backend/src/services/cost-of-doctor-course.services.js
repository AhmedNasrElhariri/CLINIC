import { prisma } from '@';

const createAppointmentDoctorCost = async data => {
  return Promise.all(data.map(d => prisma.doctorFees.create({ data: d })));
};
const createCostOfDoctorsFromAppointment = (
  userId,
  parts,
  organizationId,
  branchId,
  specialtyId,
  doctorId,
  doctorParts,
  cName
) => {
  let newParts = [];
  parts.forEach(({ name, price, number, cost, partID }) => {
    const doctorPart = doctorParts.find(({ partId }) => partId === partID);

    if (doctorPart) {
      const { feesCalculationMethod, feesCalculationType, fees } = doctorPart;
      const doctorFees =
        feesCalculationType === 'fixed'
          ? fees * number
          : feesCalculationMethod === 'before'
          ? price * number * (fees / 100)
          : (price * number - (cost ? cost : 0)) * (fees / 100);
      const part = Object.assign(
        {
          name: 'c/' + cName + '/' + name,
          amount: doctorFees,
          totalPrice: price * number,
          status: 'Draft',
          organizationId,
          userId,
          partId: partID,
          unitPrice: price,
          numberOfUnits: number,
        },
        cost && { cost },
        specialtyId && { specialtyId },
        branchId && { branchId },
        doctorId && { doctorId: doctorId }
      );
      newParts.push(part);
    }
  });
  return newParts;
};

export const CostServices = async (
  userId,
  sessions,
  organizationId,
  branchId,
  specialtyId,
  doctorId,
  cName
) => {
  const parts = sessions;
  const doctorParts = await prisma.doctorCoursePartDefination.findMany({
    where: { doctorId: doctorId },
  });

  doctorParts.length > 0 &&
    (await createAppointmentDoctorCost(
      createCostOfDoctorsFromAppointment(
        userId,
        parts,
        organizationId,
        branchId,
        specialtyId,
        doctorId,
        doctorParts,
        cName
      )
    ));
};
