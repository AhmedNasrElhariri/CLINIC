import { prisma } from '@';

const editPatient = (_, { patient }) => {
  const { id, ...data } = patient;

  return prisma.patient.update({
    data,
    where: {
      id,
    },
  });
};

export default editPatient;
