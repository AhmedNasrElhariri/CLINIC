import { prisma } from '@';

const patients = () => {
  return prisma.patient.findMany();
};

export default patients;
