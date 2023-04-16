import { prisma } from '@';

const specialty = ({ id, specialty }) => {
  if (specialty) {
    return specialty;
  }
  return prisma.appointment.findUnique({ where: { id } }).specialty();
};

export default specialty;
