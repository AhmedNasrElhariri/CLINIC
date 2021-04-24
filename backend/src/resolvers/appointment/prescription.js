import { prisma } from '@';

const prescription = ({ id }) => {
  return prisma.appointment.findUnique({ where: { id } }).prescription();
};

export default prescription;
