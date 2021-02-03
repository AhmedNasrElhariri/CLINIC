import { prisma } from '@';

const appointment = ({ id }) => {
  return prisma.patientSurgery.findOne({ where: { id } }).appointment();
};

export default appointment;
