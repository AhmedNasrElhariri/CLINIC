import { prisma } from '@';

const createPatient = (_, { input: patient }, { userId, organizationId }) => {
  return prisma.patient.create({
    data: {
      ...patient,
      organization: {
        connect: {
          id: organizationId,
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export default createPatient;
