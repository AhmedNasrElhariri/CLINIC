import { prisma } from '@';

const patient = ({ id }) => {
  return prisma.patientSurgery.findOne({ where: { id } }).patient();
};

export default patient;
