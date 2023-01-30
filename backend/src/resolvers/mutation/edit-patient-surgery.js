import { prisma } from '@';

const editPatientSurgery = async (
  _,
  { patientSurgery },
  { userId, organizationId }
) => {
  const { id, ...rest } = patientSurgery;

  return prisma.patientSurgery.update({
    data: {
      ...rest,
    },
    where: { id },
  });
};

export default editPatientSurgery;
