import { prisma } from '@';

const appointments = ({ id }) => {
  return prisma.patient.findOne({ where: { id } }).appointments();
};

export default appointments;
