import { prisma } from '@';

const doctor = ({ id }) => {
  return prisma.course.findUnique({ where: { id } }).doctor();
};

export default doctor;
