import { prisma } from '@';

const patient = ({ id }) => {
  return prisma.course.findUnique({ where: { id } }).patient();
};

export default patient;
