import { prisma } from '@';
import labDefinition from '../lab';

const patientLabDocs = (_, { status ,patientId}) => {
  return prisma.labDocument.findMany({
    where: {
      status: status,
      patientId: patientId
    },
  });
};

export default patientLabDocs;
