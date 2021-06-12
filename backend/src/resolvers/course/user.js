import { prisma } from '@';

const doctor = ({ id }) => {
  return prisma.course.findUnique({ where: { id } }).user();
};

export default doctor;
