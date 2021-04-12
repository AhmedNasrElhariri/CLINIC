import { prisma } from '@';

const patient = ({ id }) => {
  return prisma.course.findOne({ where: { id } }).patient();
};

export default patient;
