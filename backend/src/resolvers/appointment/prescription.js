import { prisma } from '@';

const prescription = ({ id }) => {
  return prisma.appointment.findOne({ where: { id } }).prescription();
};

export default prescription;
