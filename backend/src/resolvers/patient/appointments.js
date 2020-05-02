import { prisma } from '@';

const appointments = ({ id }) => {
  return prisma.patient({ id }).appointments();
};

export default appointments;
