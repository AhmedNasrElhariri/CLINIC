import { prisma } from '@';
import patient from './patient';

const patientLabDocs = (_, { status ,patientId}) => {
  return prisma.labDocument.findMany({
    where: {
      status: status,
      patientId: patientId
    },
    // include: {
    //   documents: {
    //     include: {
    //       file: true,
    //     },
    //   },
    // },
  });
};

export default patientLabDocs;
