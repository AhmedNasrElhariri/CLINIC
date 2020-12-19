import { prisma } from '@';

const hospital = ({ id }) => {
  return prisma.patientSurgery.findOne({ where: { id } }).hospital();
};

export default hospital;
