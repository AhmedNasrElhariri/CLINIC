import { prisma } from '@';

const createPatientSurgery = async (
  _,
  { patientSurgery },
  { organizationId }
) => {
  const { date, patientId, surgeryId, hospitalId } = patientSurgery;
  return prisma.patientSurgery.create({
    data: {
      date,
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
