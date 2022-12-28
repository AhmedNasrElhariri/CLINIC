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

  const updatedPatientCode = 'cr' + patientCode;
  const finalCode = code ? code : updatedPatientCode;
  const createdPatient = await prisma.patient.create({
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
  return createdPatient;
};

export default createPatient;
