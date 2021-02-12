import { prisma } from '@';

const createPatient = (_, { input: patient }, { organizationId }) => {
  return prisma.patient.create({
    data: {
      ...patient,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default createPatient;
