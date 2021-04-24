import { prisma } from '@';

const appointments = ({ id }) => {
  return prisma.patient.findUnique({ where: { id } }).appointments();
};

export default appointments;
