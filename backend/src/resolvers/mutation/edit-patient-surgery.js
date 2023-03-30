import { prisma } from '@';

const editPatientSurgery = async (_, { patientSurgery }) => {
  const { id, surgeriesIds, ...rest } = patientSurgery;
  const query1 = prisma.patientSurgery.update({
    data: {
      surgeries: { set: [] },
      ...rest,
    },
    where: { id },
  });
  const query2 = prisma.patientSurgery.update({
    data: {
      surgeries: { connect: surgeriesIds.map(id => ({ id: id })) },
      ...rest,
    },
    where: { id },
  });
  await prisma.$transaction([query1, query2]);
  return query2;
};

export default editPatientSurgery;
