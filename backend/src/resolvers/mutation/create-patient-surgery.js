import { prisma } from '@';

const createPatientSurgery = async (
  _,
  { patientSurgery },
  { organizationId }
) => {
  const { patientId, surgeryId, hospitalId, ...data } = patientSurgery;
  return prisma.patientSurgery.create({
    data: {
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
};

export default createPatientSurgery;
