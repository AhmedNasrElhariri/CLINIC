import { prisma } from '@';

const addAppointmentTypeDefinition = async (_, { appointmentTypeDefinition }, { organizationId }) => {
  return prisma.appointmentTypeDefinition.create({
    data: {
      ...appointmentTypeDefinition,
      organization: {
        connect: {
          id: organizationId,
        },
      },
    },
  });
};

export default addAppointmentTypeDefinition;
