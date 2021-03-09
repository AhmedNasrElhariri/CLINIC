import { prisma } from '@';
import labDefinition from '../lab-document';

const patientLabDocs = (_, { status ,patientId}) => {
  return prisma.labDocument.findMany({
    where: {
      status: status,
      patientId: patientId
    },
  });
};

export default patientLabDocs;
