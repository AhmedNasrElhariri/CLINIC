import { prisma } from '@';
import imageDefinition from '../image';

const patientImageDocs = (_, { status ,patientId}) => {
  return prisma.imageDocument.findMany({
    where: {
      status: status,
      patientId: patientId
    },
  });
};

export default patientImageDocs;
