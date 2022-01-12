import { prisma } from '@';

const editAppointmentTypeDefinition = async (
  _,
  { appointmentTypeDefinition, type }
) => {
  const { id, ...rest } = appointmentTypeDefinition;
  if (type === 'edit') {
    return prisma.appointmentTypeDefinition.update({
      data: rest,
      where: {
        id,
      },
    });
  } else {
    return prisma.appointmentTypeDefinition.delete({ where: { id } });
  }
};

export default editAppointmentTypeDefinition;
