import { prisma } from '@';

const patient = ({ patient }) => {
  if (patient) {
    return patient;
  }
  return prisma.appointment.findUnique({ where: { id } }).patient();
};

export default patient;
