import { prisma } from '@';

const data = ({ id }) => {
  return prisma.appointment.findOne({ where: { id } }).data();
};

export default data;
