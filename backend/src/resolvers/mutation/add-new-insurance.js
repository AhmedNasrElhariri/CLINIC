import { prisma } from '@';

const addNewInsurance = async (
  _,
  { insurance },
  { organizationId, userId }
) => {
  const {
    name,
    totalAmount,
    companyId,
    patientId,
    date,
    patientFees,
    doctorFees,
    branchId,
    specialtyId,
    doctorId,
    feesCalculationType,
    paymentMethod,
    bankId,
  } = insurance;

  const patientFeesAmount =
    feesCalculationType === 'fixed'
      ? patientFees
      : (patientFees * totalAmount) / 100;

  const insuranceTotalAmount = totalAmount - patientFeesAmount;
  // await prisma.doctorFees.create({
  //   data: Object.assign(
  //     {
  //       name,
  //       date,
  //       amount:
  //         feesCalculationType === 'fixed'
  //           ? doctorFees
  //           : (totalAmount * doctorFees) / 100,
  //       doctor: { connect: { id: doctorId } },
  //       organization: {
  //         connect: { id: organizationId },
  //       },
  //       user: {
  //         connect: { id: userId },
  //       },
  //     },
  //     specialtyId && {
  //       specialty: {
  //         connect: {
  //           id: specialtyId,
  //         },
  //       },
  //     },
  //     branchId && {
  //       branch: {
  //         connect: {
  //           id: branchId,
  //         },
  //       },
  //     }
  //   ),
  // });
  if (paymentMethod === 'cash') {
    await prisma.revenue.create({
      data: Object.assign(
        {
          name,
          date,
          amount: patientFeesAmount,
          organization: {
            connect: { id: organizationId },
          },
          user: {
            connect: { id: userId },
          },
        },
        specialtyId && {
          specialty: {
            connect: {
              id: specialtyId,
            },
          },
        },
        branchId && {
          branch: {
            connect: {
              id: branchId,
            },
          },
        },
        patientId && {
          patient: {
            connect: { id: patientId },
          },
        }
      ),
    });
  } else {
    await prisma.bankRevenue.create({
      data: Object.assign(
        {
          name,
          date,
          amount: patientFeesAmount,
          organization: {
            connect: { id: organizationId },
          },
          user: {
            connect: { id: userId },
          },
          bank: { connect: { id: bankId } },
        },
        specialtyId && {
          specialty: {
            connect: {
              id: specialtyId,
            },
          },
        },
        branchId && {
          branch: {
            connect: {
              id: branchId,
            },
          },
        },
        patientId && {
          patient: {
            connect: { id: patientId },
          },
        }
      ),
    });
  }
  return prisma.insuranceRevenue.create({
    data: Object.assign(
      {
        name,
        date,
        amount: insuranceTotalAmount,
        organization: {
          connect: { id: organizationId },
        },
        user: {
          connect: { id: userId },
        },
        company: { connect: { id: companyId } },
      },
      specialtyId && {
        specialty: {
          connect: {
            id: specialtyId,
          },
        },
      },
      branchId && {
        branch: {
          connect: {
            id: branchId,
          },
        },
      },
      patientId && {
        patient: {
          connect: { id: patientId },
        },
      }
    ),
  });
};

export default addNewInsurance;
