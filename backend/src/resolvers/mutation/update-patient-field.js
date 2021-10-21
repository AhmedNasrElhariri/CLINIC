import { prisma } from '@';

const updatePatientField = async (_, { patientId, data }, { userId }) => {
  const patientFields = data.map(({ id, value, fieldId }) => ({
    where: { id: id || fieldId },
    update: {
      value,
      field: { connect: { id: fieldId } },
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
    },
    create: {
      value,
      field: { connect: { id: fieldId } },
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
    },
  }));
  let fields = [];
  patientFields.forEach(async p => {
    const field = await prisma.patientField.upsert(p);
    fields.push(field);
  });

  return fields;
};

export default updatePatientField;
