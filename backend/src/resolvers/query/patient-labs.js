import { prisma } from '@';

const patients = (_, { patientId }) => {
  return prisma.patientLab.findMany({
    where: {
      patientId,
    },
    include: {
      documents: {
        include: {
          file: true,
        },
      },
    },
  });
};

export default patients;
