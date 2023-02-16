import { prisma } from '@';

const createAppointmentDoctorCost = async data => {
  return Promise.all(data.map(d => prisma.doctorFees.create({ data: d })));
};
const createCostOfDoctorsFromAppointment = (
  userId,
  parts,
  organizationId,
  doctorId,
  doctorParts,
  cName
) => {
  let newParts = [];
  parts.forEach(({ name, price, number, partID }) => {
    const doctorPart = doctorParts.find(({ partId }) => partId === partID);

    if (doctorPart) {
      const { feesCalculationMethod, feesCalculationType, fees } = doctorPart;
      const doctorFees =
        feesCalculationType === 'fixed'
          ? fees * number
          : feesCalculationMethod === 'before'
          ? price * number * (fees / 100)
          : price * number * (fees / 100);
      const part = {
        name: 'c/' + cName + '/' + name,
        amount: doctorFees,
        totalPrice: price * number,
        status: 'Draft',
        organization: { connect: { id: organizationId } },
        user: { connect: { id: userId } },
        part: { connect: { id: partID } },
        doctor: { connect: { id: doctorId } },
        unitPrice: price,
        numberOfUnits: number,
      };
      newParts.push(part);
    }
  });
  return newParts;
};

export const costServices = async (
  userId,
  sessions,
  organizationId,
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
        doctorId,
        doctorParts,
        cName
      )
    ));
};
