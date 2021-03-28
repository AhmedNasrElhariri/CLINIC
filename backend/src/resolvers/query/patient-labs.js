import { prisma } from '@';

const patientLabs = (_, { patientId }) => {
  return prisma.lab.findMany({
    where: {
      patientId,
    },
  });
};

export default patientLabs;
