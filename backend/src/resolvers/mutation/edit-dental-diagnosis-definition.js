import { prisma } from '@';

const editDentalDiagnosisDefinition = async (
  _,
  { dentalDiagnosisDefinition }
) => {
  const { id, ...rest } = dentalDiagnosisDefinition;

  return prisma.dentalDiagnosisDefinition.update({
    data: rest,
    where: {
      id,
    },
  });
};

export default editDentalDiagnosisDefinition;
