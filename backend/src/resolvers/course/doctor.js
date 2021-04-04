import { prisma } from '@';

const doctor = ({ id }) => {
  return prisma.course.findOne({ where: { id } }).doctor();
};

export default doctor;
