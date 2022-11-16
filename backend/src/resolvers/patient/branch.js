import { prisma } from '@';

const branch = ({ id }) => {
  return prisma.patient.findUnique({ where: { id } }).branch();
};

export default branch;
