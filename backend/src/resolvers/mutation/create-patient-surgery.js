import { prisma } from '@';
import { APPOINTMENTS_TYPES, APPOINTMENTS_STATUS } from '@/utils/constants';

const createPatientSurgery = async (
  _,
  { patientSurgery },
  { userId, organizationId }
) => {
  const {
    patientId,
    surgeriesIds,
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
      surgeries: { connect: surgeriesIds.map(id => ({ id: id })) },
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
      appointment: {
        create: {
          type: APPOINTMENTS_TYPES.Surgery,
          status: APPOINTMENTS_STATUS.SCHEDULED,
          date,
          user: {
            connect: { id: userId },
          },
          doctor: {
            connect: {
              id: userId,
            },
          },
          patient: {
            connect: {
              id: patientId,
            },
          },
          organization: {
            connect: {
              id: organizationId,
            },
          },
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
        user: {
          connect: { id: userId },
        },
        organization: {
          connect: { id: organizationId },
        },
      },
    });
  }

  return persistedPatientSurgery;
};

export default createPatientSurgery;
