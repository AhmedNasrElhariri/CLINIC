import { prisma } from '@';

const addLabDocs = async (_, { patientLab }) => {
  const { patientId, name, documents } = patientLab;
  let persistedPatientLab = await prisma.patientLab.findOne({
    where: {
      name_patientId_unique_constraint: {
        name,
        patientId,
      },
    },
    include: {
      documents: true,
    },
  });
  if (!persistedPatientLab) {
    return prisma.patientLab.create({
      data: {
        name,
        patient: {
          connect: {
            id: patientId,
          },
        },
        documents: {
          create: documents.map(id => ({
            file: {
              connect: {
                id,
              },
            },
          })),
        },
      },
    });
  }
  return prisma.patientLab.update({
    data: {
      documents: {
        connect: persistedPatientLab.documents.map(({ id }) => ({
          id,
        })),
        create: documents.map(id => ({
          file: {
            connect: {
              id,
            },
          },
        })),
      },
    },
    where: { id: persistedPatientLab.id },
  });
};

export default addLabDocs;
