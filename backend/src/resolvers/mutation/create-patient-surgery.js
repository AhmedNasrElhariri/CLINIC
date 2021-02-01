import { prisma } from '@';

const createPatientSurgery = async (
  _,
  { clinicId, patientSurgery },
  { organizationId }
) => {
  const {
    patientId,
    surgeryId,
    hospitalId,
    fees,
    date,
    ...data
  } = patientSurgery;
  const persistedPatientSurgery = await prisma.patientSurgery.create({
    data: {
      fees,
      date,
      ...data,
      patient: {
        connect: {
          id: patientId,
        },
      },
      surgery: {
        connect: {
          id: surgeryId,
        },
      },
      hospital: {
        connect: {
          id: hospitalId,
        },
      },
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });

  if (fees > 0) {
    await prisma.revenue.create({
      data: {
        date,
        name: 'Surgery fees',
        amount: fees,
        clinic: {
          connect: {
            id: clinicId,
          },
        },
      },
    });
  }

  return persistedPatientSurgery;
};

export default createPatientSurgery;
