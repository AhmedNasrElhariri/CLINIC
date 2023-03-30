import { prisma } from '@';

const surgeries = ({ id }) => {
  return prisma.patientSurgery.findUnique({ where: { id } }).surgeries();
};

export default surgeries;
