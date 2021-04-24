import { prisma } from '@';

const hospital = ({ id }) => {
  return prisma.patientSurgery.findUnique({ where: { id } }).hospital();
};

export default hospital;
