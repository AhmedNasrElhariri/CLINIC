import { prisma } from '@';

const addToothDiagnosis = async (
  _,
  { toothDiagnosis },
  { userId, organizationId }
) => {
  const {
    toothNumber,
    toothPartNumber,
    depth,
    diagnosisId,
    patientId,
    doctorId,
  } = toothDiagnosis;
  const tooth = await prisma.tooth.findMany({
    where: {
      toothNumber,
      toothPartNumber,
      patientId,
    },
  });
  if (tooth.length > 0) {
    const toothRow = tooth[0];
    await prisma.toothTransaction.create({
      data: {
        tooth: {
          connect: {
            id: toothRow.id,
          },
        },
        depth,
        dentalDiagnosis: {
          connect: {
            id: diagnosisId,
          },
        },
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
        doctor: {
          connect: {
            id: doctorId,
          },
        },
      },
    });
    return toothRow;
  } else {
    const toothRow = await prisma.tooth.create({
      data: {
        toothNumber,
        toothPartNumber,
        patient: {
          connect: {
            id: patientId,
          },
        },
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
    await prisma.toothTransaction.create({
      data: {
        tooth: {
          connect: {
            id: toothRow.id,
          },
        },
        depth,
        dentalDiagnosis: {
          connect: {
            id: diagnosisId,
          },
        },
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
        doctor: {
          connect: {
            id: doctorId,
          },
        },
      },
    });
    return toothRow;
  }
};

export default addToothDiagnosis;
