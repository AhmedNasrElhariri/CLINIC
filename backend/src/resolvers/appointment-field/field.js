import { prisma } from '@';

const field = ({ id }) => {
  return prisma.appointmentField.findUnique({ where: { id } }).field();
};

export default field;
