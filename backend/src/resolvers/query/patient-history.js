import { prisma } from '@';

const patientHistory = async (_, { id }) => {
  return prisma.patient
    .findOne({ where: { id } })
    .appointments({ where: { status: 'Archived' } });
};

export default patientHistory;
