import { prisma } from '@';

const getUserPatientFields = async (_, __, { userId }) => {
  const activeViews = await prisma.patientViewStatus.findMany({});
  const activeViewId = activeViews[0].activeViewId;

  const fields = await prisma.patientField.findMany({
    where: {
      userId: userId,
      field: {
        fieldGroup: {
          patientViewId: activeViewId,
        },
      },
    },
    include: {
      patient: true,
      field: true,
    },
  });
  return fields;
};

export default getUserPatientFields;
