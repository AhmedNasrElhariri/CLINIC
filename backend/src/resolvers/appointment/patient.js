import { prisma } from '@';

const patient = ({ id }) => {
  return prisma.appointment.findOne({ where: { id } }).patient();
};

export default patient;
