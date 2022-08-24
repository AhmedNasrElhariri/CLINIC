import { prisma } from '@';

const subscriptionType = async ({ id }) => {
  const patient = await prisma.appointment
    .findUnique({ where: { id } })
    .patient();
  const apps = await prisma.appointment.count({
    where: {
      patientId: patient.id,
    },
  });
  if (apps > 1) {
    return 'Old';
  } else {
    return 'New';
  }
};

export default subscriptionType;
