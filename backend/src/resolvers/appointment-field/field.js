import { prisma } from '@';

const field = ({ id }) => {
  return prisma.appointmentField.findOne({ where: { id } }).field();
};

export default field;
