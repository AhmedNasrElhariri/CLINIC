import { prisma } from '@';

const labs = ({ id }) => {
  return prisma.appointment.findOne({ where: { id } }).labs();
};

export default labs;
