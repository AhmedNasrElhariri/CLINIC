import { prisma } from '@';

const collections = ({ id }) => {
  return prisma.appointment.findOne({ where: { id } }).collections();
};

export default collections;
