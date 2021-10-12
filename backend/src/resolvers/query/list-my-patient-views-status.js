import { prisma } from '@';

const listPatientViewStatus = (_, __, { userId }) => {
  return prisma.patientViewStatus.findMany({
    where: {
      userId,
    },
  });
};

export default listPatientViewStatus;
