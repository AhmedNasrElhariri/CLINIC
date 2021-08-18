import { prisma } from '@';
import patient from './patient';

const myTooths = async (_, { patientId }, { userId, organizationId }) => {
  const tooths = await prisma.tooth.findMany({
    where: {
      patientId: patientId,
    },
  });
  return tooths;
};

export default myTooths;
