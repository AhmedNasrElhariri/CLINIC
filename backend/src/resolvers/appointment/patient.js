import { prisma } from '@';

const patient = ({ patient, id }) => {
  if (patient) {
    return patient;
  }
  return prisma.appointment.findUnique({ where: { id } }).patient();
};

export default patient;
