import { prisma } from '@';

const user = ({ id, doctor }) => {
  if (doctor) {
    return doctor;
  }
  return prisma.appointment.findUnique({ where: { id } }).doctor();
};

export default user;
