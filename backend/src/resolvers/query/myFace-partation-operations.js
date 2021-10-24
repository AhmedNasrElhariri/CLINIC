import { prisma } from '@';
import patient from './patient';

const myFacePartationOperations = async (
  _,
  { patientId, facePartationNumber },
  { userId, organizationId }
) => {
  const partation = await prisma.facePartation.findMany({
    where: {
      number: facePartationNumber,
      patientId: patientId,
    },
  });
  const partationId = partation[0].id;
  const operations = await prisma.faceOperation.findMany({
    where: {
      patientId: patientId,
      partationId: partationId,
    },
    include: {
      material: true,
      facePartation: true,
    },
  });
  return operations;
};

export default myFacePartationOperations;
