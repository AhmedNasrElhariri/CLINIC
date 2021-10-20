import { prisma } from '@';
import patient from './patient';

const myFaceOperations = async (_, { patientId }, { userId, organizationId }) => {
  
  const operations = await prisma.faceOperation.findMany({
    where: {
      patientId: patientId,
    },
    include:{
        material:true,
        facePartation:true,
    },
  });
  return operations;
};

export default myFaceOperations;
