import { prisma } from '@';


const addToothDiagnosis = async (
  _,
  { dentalDiagnosisDefinition },
  { userId, organizationId }
) => {
  const { name } = dentalDiagnosisDefinition;
  return prisma.dentalDiagnosisDefinition.create({
    data: {
      name,
      user: {
        connect: {
          id: userId,
        },
      },
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addToothDiagnosis;

