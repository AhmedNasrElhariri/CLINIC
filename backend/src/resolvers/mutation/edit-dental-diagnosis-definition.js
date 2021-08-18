import { prisma } from '@';

const editDentalDiagnosisDefinition = async (_, { dentalDiagnosisDefinition }) => {
    console.log(dentalDiagnosisDefinition,'dentalDiagnosisDefinitiondentalDiagnosisDefinition');
  const { id, ...rest } = dentalDiagnosisDefinition;

  return prisma.dentalDiagnosisDefinition.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editDentalDiagnosisDefinition;
