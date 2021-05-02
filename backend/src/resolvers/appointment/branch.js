import { prisma } from '@';

const branch = ({ id }) => {
  return prisma.appointment.findUnique({ where: { id } }).branch();
};

export default branch;
