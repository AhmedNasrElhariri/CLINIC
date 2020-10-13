import { prisma } from '@';

const clinic = ({ id }) => {
  return prisma.appointment.findOne({ where: { id } }).clinic();
};

export default clinic;
