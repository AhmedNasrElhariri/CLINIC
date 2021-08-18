import { prisma } from '@';

const myDentalDiagnosissDefinition = (_, __, { userId ,organizationId}) => {
  return prisma.dentalDiagnosisDefinition.findMany({
    where: {
      organizationId,
    },
  });
};

export default myDentalDiagnosissDefinition;
