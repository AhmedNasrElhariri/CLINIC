import { prisma } from '@';

const myAppointmentTypesDefinition = (_, __, { organizationId }) => {
  return prisma.appointmentTypeDefinition.findMany({
    where: {
      organizationId,
    },
  });
};

export default myAppointmentTypesDefinition;
