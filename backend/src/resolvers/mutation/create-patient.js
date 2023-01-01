import { prisma } from '@';

const createPatient = async (
  _,
  { input: patient },
  { userId, organizationId }
) => {
  const { code, branchId, ...rest } = patient;

  const organization = await prisma.organization.findUnique({
    where: {
      id: organizationId,
    },
  });

  const { patientCode, id } = organization;
  if (!code) {
    await prisma.organization.update({
      data: {
        patientCode: patientCode + 1,
      },
      where: {
        id,
      },
    });
  }
  const updatedPatientCode = 'cr' + patientCode;
  const finalCode = code ? code : updatedPatientCode;
  return prisma.patient.create({
    data: Object.assign(
      {
        code: finalCode,
        ...rest,
        organization: {
          connect: {
            id: organizationId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
      branchId && {
        branch: {
          connect: {
            id: branchId,
          },
        },
      }
    ),
  });
};

export default createPatient;
