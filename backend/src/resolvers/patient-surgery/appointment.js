import { prisma } from '@';

const appointment = ({ id }) => {
  return prisma.patientSurgery.findUnique({ where: { id } }).appointment();
};

export default appointment;
